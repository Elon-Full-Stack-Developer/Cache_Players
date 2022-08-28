import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { doAddMsg, doChangeTime, doGetAllPlayers } from "../redux/PlayerReducer";
import { Add } from "./utils";

const url = "http://localhost:8000/api/player";

const GetDataPlayer = () => {
  const [player, setPlayer] = useState({});
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { players: playersData } = useSelector((state) => state.PLAYER);

  useEffect(() => {
    console.log(msg);
  }, [msg]);

  useEffect(() => {
    if (id !== null) {
      const result = playersData.find((player) => player.id === parseInt(id));
      if (result) {
        setPlayer(result);
      }
      else {
        navigate("/mainPage/getAllPlayers");
      }
    }
  }, [id, navigate, playersData]);
  
  const AddMsg = async (e) => {
    e.preventDefault();
    
    const obj = { id: player.id, name: player.name, msg };
    console.log(obj);
    
    // add msg
    const { data } = await Add(url, obj);
    if (data.ErrorMsg) {
      alert(data.ErrorMsg);
      const players = playersData.filter(item => item.id !== parseInt(id))
      dispatch(doGetAllPlayers(players));
      dispatch(doChangeTime(data.time))
      navigate("/mainPage/getAllPlayers");
    }
    else {
      alert(data.status);
      dispatch(doAddMsg({msg, date: data.date, id: id}))
      dispatch(doChangeTime(data.time))
    }
  };

  return (
    <div>
      <div className="font-serif bg-white shadow-1 p-5 rounded-lg rounded-tl-[90px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition">
        <img
          className="rounded-tl-[90px]"
          src={player?.image}
          alt={player?.name}
        />
        <p className="bg-gray-500 rounded-t-full text-white px-3">
          {player.name}
        </p>
        <div className="mb-4 flex gap-x-2 text-sm">
          <div className="bg-green-500 rounded-full text-white px-3">
            {player?.gender}
          </div>
          <div className="bg-violet-500 rounded-t-full text-white px-3">
            {player?.birthday}
          </div>
        </div>
      </div>

      <form onSubmit={AddMsg}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            message
          </label>
          <input
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            id="large-input"
            //   className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className="text-gray-900 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm  bg-gradient-to-l"
          />
        </div>
        <div className="grid mb-2 gap-2">
          <button
            disabled={!msg.length > 0}
            className={`bg-blue-500 ${
              msg.length > 0 ? "hover:bg-blue-700" : ""
            } text-white font-bold py-2 px-4 rounded`}
          >
            שמור
          </button>

          {player?.msg?.Messages &&
          <div className='mx-auto overflow-scroll w-3/4 max-h-96 overflow-x-hidden px-2 py-2 flex flex-col space-y-6 border-gray-300 rounded-lg scrollbar-hide border-4'>
            {player?.msg?.Messages.map((item, index) => {
              return (
                <div key={index} className='bg-gray-200 shadow-1 p-4 rounded-lg w-full cursor-pointer hover:shadow-2xl hover:bg-blue-300 transition' >
                  <p className='text-2xl'>
                    {item.msg}
                  </p>
                  <div className='py-4'></div>
                  <p className=''>{item.date}</p>
                </div>
              )
            })}
          </div>}

          <button
            onClick={() => navigate("/mainPage/getAllPlayers")}
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
          >
            חזור לדף הקודם
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetDataPlayer;
