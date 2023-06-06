import React from "react";
import "./App.css";
import { Login, Register } from "./Pages";
import Header from "./Components/Layouts/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import GoogleAuthTest2 from "./Pages/GoogleAuthTest2";
import OAuthTest from "./Pages/OAuthTest";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
