import React from "react";
import { Route, Routes } from "react-router-dom";
import GetAllPlayers from "./pages/GetAllPlayers";
import GetDataPlayer from "./pages/GetDataPlayer";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mainPage" element={<MainPage />}>
          <Route path="getAllPlayers" element={<GetAllPlayers />} />
          <Route path="getDataPlayer/:id" element={<GetDataPlayer />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
