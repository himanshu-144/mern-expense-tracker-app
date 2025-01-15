import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
