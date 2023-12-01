import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home/:userId" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
