import React from 'react'
import logo from '../images/logo2.png'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-linear-to-br from-[#5582f2] to-[#25b0ff] w-full min-h-screen text-white flex justify-center items-center px-4'>
      <div className='flex flex-col justify-center items-center gap-4 text-center'>
        <img src={logo} className='w-48 sm:w-64 md:w-80 lg:w-90' />
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-bold'>Welcome to Microsoft To-Do</h1>
        <p className='text-base sm:text-lg md:text-[20px]'>Log in with your account</p>
        <Link to={'/login'} className='bg-white py-3 sm:py-4 px-8 sm:px-10 text-[#25b0ff] font-bold cursor-pointer'>Log in</Link>
      </div>
    </div>
  )
}

export default Start