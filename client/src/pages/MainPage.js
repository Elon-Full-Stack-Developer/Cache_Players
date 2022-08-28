import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { doChangeTime, doGetAllPlayers } from "../redux/PlayerReducer";
import { GetAll } from "./utils";

const url = "http://localhost:8000/api/player";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetAll(url);
      console.log(data);
      dispatch(doGetAllPlayers(data.players));
      dispatch(doChangeTime(data.time));
    };
    fetchData();
    console.log("Once !");
  }, [dispatch]);
  

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainPage;
