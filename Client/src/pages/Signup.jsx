import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/auth';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await signup(username, email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            navigate('/home');
        } catch (err) {
            console.log('Error message:', err);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen w-full bg-white px-4'>
            <div className='flex flex-col gap-4 w-full max-w-sm shadow-[4px_4px_10px_6px_rgba(150,150,150,0.5)] p-6 sm:p-8'>
                <div className='flex gap-4'>
                    <img src={logo} className='w-10' />
                    <p className='font-bold text-xl'>To-Do</p>
                </div>
                <h1 className='font-semibold text-2xl'>Sign up</h1>
                <form className='flex flex-col gap-8' onSubmit={(e) => submitHandler(e)}>
                    <div className='flex flex-col gap-4'>
                        <input required type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} className='border-none outline-none w-full' />
                        <hr className='-mt-4' />
                        <input required type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='border-none outline-none w-full' />
                        <hr className='-mt-4' />
                        <input required type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-none outline-none w-full' />
                        <hr className='-mt-4' />
                    </div>
                    <p className='text-sm sm:text-base'>Already have an account? <Link to={'/login'}><span className='text-blue-900'>login here</span></Link></p>
                    <div className='flex justify-end'>
                        <button className='bg-[#0066b9] text-white px-4 py-2 cursor-pointer'>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup