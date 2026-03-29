import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/logo2.png'
import profile from '../images/profile.png'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

const Navbar = () => {
    const [isOpen, setisOpen] = useState(false);
    const name = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const panelRef = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setisOpen(false);
            }
        }
        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
    }, []);

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await logout();
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            navigate('/login')
        } catch (err) {
            console.log('Error message', err);
        }
    }

    return (
        <div className='bg-[#2465cf] flex justify-between p-3 sm:p-4'>
            <Link to={'/home'} className='flex justify-center items-center gap-2'>
                <img src={logo} className='w-8 sm:w-10' />
                <p className='text-white font-semibold text-sm sm:text-base'>To-Do</p>
            </Link>
            <div className='flex justify-center items-center'>
                <p className='text-white font-semibold text-xs sm:text-base'>Hello, <span className='font-bold uppercase'>{name}</span></p>
            </div>
            <div ref={panelRef}>
                <img src={profile} className='w-8 sm:w-10 cursor-pointer' onClick={() => setisOpen(true)} />
                {isOpen && (
                    <div className='absolute right-2 sm:right-10 top-12 sm:top-14 w-64 sm:w-80 bg-white shadow-[4px_4px_10px_6px_rgba(150,150,150,0.5)] rounded-md z-50 p-3 sm:p-4 flex'>
                        <img src={profile} className='w-20 h-28 sm:w-30 sm:h-40' />
                        <div className='flex flex-col p-2 sm:p-4 gap-2'>
                            <p className='font-semibold text-sm sm:text-base'>My Profile</p>
                            <p className='font-bold uppercase text-base sm:text-xl'>{name}</p>
                            <p className='font-medium text-xs sm:text-sm text-gray-600 underline'>{email}</p>
                            <button className='px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white font-semibold bg-red-600 cursor-pointer w-fit' onClick={logoutHandler}>Log Out</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar