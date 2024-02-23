// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components'
import LoginPage from './components/templates/auth/LoginPage'
import MovieDashboard from './components/templates/movies/MovieDashboard'
import ProfilePage from './components/templates/user/ProfilePage'
import SignupPage from './components/templates/auth/SignupPage';






function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Header />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/moviedash" element={<MovieDashboard />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;