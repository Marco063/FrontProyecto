import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../views/App";
import Events from "../views/Events"
import Discipline from "../views/Discipline"
import Affiliate from "../views/Affiliate"
import Attendance from "../views/Attendance"
import NavBar from "../components/NavBar"

const Router = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route exact path="/" Component={App} />
        <Route path="/Events" Component={Events} />
        <Route path="/Discipline" Component={Discipline} />
        <Route path="/Affiliate" Component={Affiliate} />
        <Route path="/Attendance" Component={Attendance} />

      </Routes>
    </BrowserRouter>
  );
};

export default Router;
