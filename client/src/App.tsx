// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { Header } from './components'
import SignupPage from './components/templates/signup/Signup'
import LoginPage from './components/templates/login/Login'



const App = () => {
  return (
    <>
      <Header/>
      <SignupPage/>
      <LoginPage/>
     
    </>
  )
}

export default App
