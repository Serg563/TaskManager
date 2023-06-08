import React from "react";
import "./App.css";
import { Login, Register } from "./Pages";
import Header from "./Components/Layouts/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import GoogleAuthTest2 from "./Pages/GoogleAuthTest2";
import OAuthTest from "./Pages/OAuthTest";
import developerModel from "./Interfaces/developerModel";
import Admin from "./Pages/Admin";
import TaskList from "./Components/Pages/Tasks/TaskList";
import {
  AddDeveloper,
  UpdateDeveloper,
  ViewDeveloper,
} from "./Components/Pages/Developers";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/developers" element={<Admin />}></Route>
        <Route path="/addDeveloper" element={<AddDeveloper />}></Route>
        <Route
          path="/developers/updateDeveloper/:id"
          element={<UpdateDeveloper />}
        ></Route>
        <Route path="/developers/view/:id" element={<ViewDeveloper />}></Route>
        <Route path="/tasks" element={<TaskList />}></Route>
      </Routes>
    </>
  );
}

export default App;
