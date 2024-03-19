// eslint-disable-next-line no-unused-vars
import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components";
import AuthPage from "./pages/AuthPage";
import MovieDashboard from "./components/templates/movies/MovieDashboard";
import ProfilePage from "./components/templates/user/ProfilePage";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/moviedash" element={<MovieDashboard />} />
        {/* <Route path="/products" element={<ProfilePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
