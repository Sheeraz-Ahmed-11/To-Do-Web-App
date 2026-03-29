import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import MyDay from './pages/MyDay'
import Important from './pages/Important'
import Planned from './pages/Planned'
import Tasks from './pages/Tasks'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<UserProtectedWrapper><Home /></UserProtectedWrapper>} />
        <Route path='/my-day' element={<UserProtectedWrapper><MyDay /></UserProtectedWrapper>} />
        <Route path='/important' element={<UserProtectedWrapper><Important /></UserProtectedWrapper>} />
        <Route path='/planned' element={<UserProtectedWrapper><Planned /></UserProtectedWrapper>} />
        <Route path='/tasks' element={<UserProtectedWrapper><Tasks /></UserProtectedWrapper>} />
      </Routes>
    </>
  )
}

export default App