const jFIle = require('jsonfile');
const fs = require('fs');
/*
1. Create A REST API with 2 routers:
a. /products – with a full CRUD operations on products data based on the
following products.json file
*/

const CreatePlayersMsgJFile = () => {
    return new Promise((resolve, reject) => {
        jFIle.writeFile(__dirname + "/playersMsg.json", {players: []}, function(err)
        {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve("File is Created !");
            }
        })
    })
}

const getPlayers = () =>
{
    return new Promise((resolve, reject) =>
    {
        jFIle.readFile(__dirname + "/playersMsg.json", function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data.players)
            }
        })
    })   
}

const getPlayer = (id) =>
{
    return new Promise((resolve, reject) =>
    {
        jFIle.readFile(__dirname + "/playersMsg.json", function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                let players = data.players;
                let player = players.find(x => x.id == id)
                resolve(player);
            }
        })
    })   
}


const AddPlayer = (newProd) =>
{
    return new Promise((resolve, reject) =>
    {
        jFIle.readFile(__dirname + "/playersMsg.json", function(err, data)
        {
            if (err)
            {
                reject(err)
            }
            else
            {
                let players = data.players;

                players.push(newProd);

                let plays = {"players" : players};

                jFIle.writeFile(__dirname + "/playersMsg.json", plays, function(err)
                {
                    if (err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve("הודעה זו נשלחה בהצלחה");
                    }
                })
            }
        })
    })
}

const UpdutePlayer = (id, play) =>
{
    return new Promise((resolve, reject) =>
    {
        jFIle.readFile(__dirname + "/playersMsg.json", function(err, data)
        {
            if (err)
            {
                reject(err)
            }
            else
            {
                let players = data.players;

                let index = players.findIndex(x => x.id ==id);
                if (index >= 0)
                {
                    players[index] = play;
                }

                let plays = {"players" : players};

                jFIle.writeFile(__dirname + "/playersMsg.json", plays, function(err)
                {
                    if (err)
                    {
                        reject(err)
                    }
                    else
                    {
                        resolve("הודעה זו נשלחה בהצלחה");
                    }
                })
            }
        })
    })
}

// const DeletePlayer = (id) =>
// {
//     return new Promise((resolve, reject) =>
//     {
//         jFIle.readFile(__dirname + "/playersMsg.json", function(err, data)
//         {
//             if (err)
//             {
//                 reject(err)
//             }
//             else
//             {
//                 let players = data.players;

//                 let index = players.findIndex(x => x.id == id);
//                 if (index >= 0)
//                 {
//                     players.splice(index,1);
//                 }

//                 let plays = {"players" : players};

//                 jFIle.writeFile(__dirname + "/playersMsg.json", plays, function(err)
//                 {
//                     if (err)
//                     {
//                         reject(err)
//                     }
//                     else
//                     {
//                         resolve("Deleted !");
//                     }
//                 })
//             }
//         })
//     })
// }

module.exports = { CreatePlayersMsgJFile, getPlayers, getPlayer, AddPlayer, UpdutePlayer };