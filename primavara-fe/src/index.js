import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home.js";
import Register from "./views/register.js";
import Login from "./views/login.js";
import Profile from "./views/profile.js";
import RegisterDog from "./views/registerDog.js";
import NewRequest from "./views/newRequest.js"

import './index.css'
 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/profile" element={<Profile />} />
          <Route path="/dogs/register" element={<RegisterDog />} />
          <Route path="/reqgua" element={<NewRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);