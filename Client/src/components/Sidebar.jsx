import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const links = [
    { to: '/my-day', label: '🔆 My Day' },
    { to: '/important', label: '⭐ Important' },
    { to: '/planned', label: '🗒️ Planned' },
    { to: '/tasks', label: '🏠 Tasks' },
  ]

  return (
    <div className='w-16 sm:w-40 md:w-56'>
      <div className='flex flex-col p-3 sm:p-6 md:p-10 gap-5 sm:gap-8 md:gap-10'>
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `transition-all duration-200 text-sm sm:text-base ${ isActive ? 'text-blue-600 font-bold border-l-4 border-blue-600 pl-2' : 'text-gray-600 hover:text-blue-400 pl-2' }`}>
            <span className='sm:hidden text-lg'>{label.split(' ')[0]}</span>
            <span className='hidden sm:inline'>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar