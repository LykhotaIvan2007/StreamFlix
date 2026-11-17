import { useState } from 'react'
import Registration from "./assets/pages/Registration/Registration.jsx";
import Login from "./assets/pages/Login/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Film from './assets/pages/Film/Film.jsx';
import Home from './assets/pages/Home/Home.jsx';
import Profile from './assets/pages/Profile/Profile.jsx';
import CreateProfile from './assets/pages/CreateProfile/CreateProfile.jsx';
import CreateFilm from "./assets/pages/CreateFilm/CreateFilm";
import ActivateAccount from "./assets/pages/ActivateAccount/ActivateAccount";
import ChangePassword from "./assets/pages/ChangePassword/ChangePassword";

function App() {

  return (
      <Router>
          <Routes>
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/film/:id" element={<Film />} />
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/create-film" element={<CreateFilm />} />
              <Route path="/activate-account" element={<ActivateAccount />} />
              <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
      </Router>
  )
}

export default App
