import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home.js";
import Register from "./views/register.js";
import Login from "./views/login.js";
import RegisterDog from "./views/registerdog.js";
import RequestGuardian from "./views/requestguardian.js"

import './index.css'
 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/dogs/register" element={<RegisterDog />} />
          <Route path="/reqgua" element={<RequestGuardian />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);