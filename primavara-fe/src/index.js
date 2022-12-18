import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home.js";
import Register from "./views/register.js";
import Login from "./views/login.js";
import Profile from "./views/profile.js";
import RegisterDog from "./views/registerdog.js";
import NewRequest from "./views/newRequest.js"
import MyRequests from "./views/myRequests.js";
import NewOffer from "./views/newOffer.js";
import MyOffers from "./views/myOffers";
import MyDogs from "./views/mydogs.js";
import Requests from "./views/requests.js";
import Offers from "./views/offers.js";
import Moderation from "./views/moderation.js";

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
          <Route path="/reqdog" element={<NewRequest />} />
          <Route path="/users/requests" element={<MyRequests />} /> {/* ovo je za my requests */}
          <Route path="/reqgua" element={<NewOffer />} />
          <Route path="/users/offers" element={<MyOffers />} />
          <Route path="/users/dogs" element={<MyDogs />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/moderation" element={<Moderation />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);