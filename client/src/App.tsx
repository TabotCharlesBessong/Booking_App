import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Header } from './components'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={"Hello Home"} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App