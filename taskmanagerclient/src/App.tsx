import React from "react";
import "./App.css";
import { Login, Register } from "./Pages";
import Header from "./Components/Layouts/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import GoogleAuthTest2 from "./Pages/GoogleAuthTest2";
import OAuthTest from "./Pages/OAuthTest";
import DeveloperList from "./Components/Pages/Developers/DeveloperList";
import AddDeveloper from "./Components/Pages/Developers/AddDeveloper";
import UpdateDeveloper from "./Components/Pages/Developers/UpdateDeveloper";
import developerModel from "./Interfaces/developerModel";
import Admin from "./Pages/Admin";

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
      </Routes>
    </>
  );
}

export default App;
