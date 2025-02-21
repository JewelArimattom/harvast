import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password}); 
            if (response.data.success) {
               setToken(response.data.token);
            }
            else {
                toast.error("Invalid credentials please try again");
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid credentials please try again");
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full' >
      <div className='bg-blue-100 shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold text-black mb-4 '>Admin Panel Login</h1>
        <form onSubmit={onSubmitHandler}>
         <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-black mb-2'>Email Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none' type="email" placeholder='Enter your email' required />
         </div>
         <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-black mb-2'>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-400 outline-none' type="password" placeholder='Enter your password' required />
         </div>
         <button className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700 '>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
