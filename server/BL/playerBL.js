const axios = require("axios");
const fs = require("fs");
const localStorage = require("localStorage");
const playersMsgBL = require("./playersMsgBL");

const url = "https://api.tvmaze.com/shows/1/cast";

let time;

const GetAllPlayers = async () => {
  const { data } = await axios.get(url);
  const players = data.map((item) => {
    return (item.person = {
      id: item.person.id,
      name: item.person.name,
      birthday: item.person.birthday,
      gender: item.person.gender,
      image: item.person.image.medium,
    });
  });
  localStorage.setItem("myCache", JSON.stringify(players));
  return players;
};

const GetFromCache = async () => {
  let players;
  const CacheTime = localStorage.getItem("myCacheTime");
  const Cache = localStorage.getItem("myCache");

  const path = __dirname + "/playersMsg.json";
  if (fs.existsSync(path)) {
    console.log("yes !");
  } else {
    let status = await playersMsgBL.CreatePlayersMsgJFile();
    console.log(status);
  }

  if (Cache !== null) {
    console.log("save in Cache !");
    players = JSON.parse(Cache);

    for (let i = 0; i < players.length; i++) {
      let playerMsg = await playersMsgBL.getPlayer(players[i].id);
      players[i].msg = playerMsg || {};
    }

    console.log(`${CacheTime} minutes !`);
    return { players, time: parseInt(CacheTime) };
  }
  localStorage.setItem("myCacheTime", 300000);
  players = await GetAllPlayers();

  for (let i = 0; i < players.length; i++) {
    let playerMsg = await playersMsgBL.getPlayer(players[i].id);
    players[i].msg = playerMsg || {};
  }
  return { players, time: 300000 };
};

let Interval;

Interval = setInterval(async () => {
  const players = await GetAllPlayers();
  localStorage.setItem("myCache", JSON.stringify(players));
  // console.log(`${300000} minutes lpassed !`);
}, 300000);

const ChangeTime = (newTime) => {
  time = newTime;

  clearInterval(Interval);
  Interval = setInterval(async () => {
    const players = await GetAllPlayers();
    localStorage.setItem("myCache", JSON.stringify(players));
    console.log(`${newTime} minutes passed !`);
  }, newTime);
  localStorage.setItem("myCacheTime", newTime);
  console.log(localStorage.getItem("myCacheTime"));
  return `הזמן שונה ל ${newTime > 60000 ? newTime / 60000 : ""}${
    newTime > 60000 ? " " : ""
  }${newTime > 60000 ? "דקות" : "דקה אחת"}`;
};

const AddMsgToTxT = async (newMsg) => {
  console.log(newMsg);
  const players = localStorage.getItem("myCache");
  const player = JSON.parse(players).find(
    (item) => item.id === parseInt(newMsg.id)
  );
  if (player) {

    // Set variable to current date and time
    const date = new Date().toLocaleString().split(', ').reverse().join(' ').split('.').join('/');

    let status;

    let getPlayer = await playersMsgBL.getPlayer(newMsg.id);

    let UpdatePlayer;

    if (getPlayer) {
      getPlayer.Messages.push({ msg: newMsg.msg, date });

      status = await playersMsgBL.UpdutePlayer(newMsg.id, getPlayer);
      UpdatePlayer = getPlayer;
    } else {
      UpdatePlayer = {
        id: newMsg.id,
        name: newMsg.name,
        Messages: [{ msg: newMsg.msg, date }],
      };
      status = await playersMsgBL.AddPlayer(UpdatePlayer);
    }

    let jsonPlayers = JSON.parse(players);
    let index = jsonPlayers.findIndex((x) => x.id === parseInt(newMsg.id));
    if (index > -1) {
      jsonPlayers[index].msg = UpdatePlayer;
    }
    console.log(jsonPlayers);

    let newStrPlayersMsgs = "";
    let AllPlayersMsgs = await playersMsgBL.getPlayers();
    for (let i = 0; i < AllPlayersMsgs.length; i++) {
      const play = AllPlayersMsgs[i];

      let Messages = "";
      for (let j = 0; j < play.Messages.length; j++) {
        let item = play.Messages[j];
        Messages += `msg: ${item.msg}\ndate: ${item.date}\n\n`;
      }
      newStrPlayersMsgs += `id: ${play.id}\nname: ${play.name}\n\nMessages:\n\n${Messages}______________________________\n\n`;
    }

    return new Promise((resolve, reject) => {
      fs.writeFile("msg.txt", newStrPlayersMsgs, (err) => {
        if (err) {
          reject(err);
        } else {
          localStorage.setItem("myCache", JSON.stringify(jsonPlayers));
          resolve({ status, date, time });
        }
      });
    });
  }
  return { ErrorMsg: "שחקן זה לא נמצא במאגר כרגע, לא ניתן לשלוח הודעה", time };
};


const DeletePlayer = (id) => {
  const Cache = localStorage.getItem("myCache");
  if (Cache) {
    const findPlayer = JSON.parse(Cache).find((x) => x.id === parseInt(id));
    if (findPlayer) {
      const Players = JSON.parse(Cache).filter(
        (player) => player.id !== parseInt(id)
      );
      localStorage.setItem("myCache", JSON.stringify(Players));
      return {status : `שחקן ${id} נמחק בהצלחה !`, time};
    }
  }
  return {status : "שחקן זה כבר מחוק", time};
};

module.exports = { GetFromCache, AddMsgToTxT, ChangeTime, DeletePlayer };
