// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { Header } from './components'
import AuthPage from './components/templates/auth/AuthPage'
import MovieDashboard from './components/templates/movies/MovieDashboard'
import ProfilePage from './components/templates/user/ProfilePage'





const App = () => {
  return (
    <>
      <Header/>
      <AuthPage/>
     <MovieDashboard/>
     <ProfilePage></ProfilePage>

    </>
  )
}

export default App
