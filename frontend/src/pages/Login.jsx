import React, { useState } from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const onSubmitHandler = async (event) =>{
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-600' >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular font-bold text-3xl'>{currentState}</p>
        <hr className='border-none w-8 h-[1.5px] bg-black'/>
      </div>
      {currentState === "Login" ?'':       <input type="text" className='w-full border border-gray-400  px-3 py-2 ' placeholder='Name' required/> }
      <input type="email" className='w-full border border-gray-400  px-3 py-2 ' placeholder='Email' required/>
      {currentState === "Login" ?'':       <input type="number" className='w-full border border-gray-400 px-3 py-2 ' placeholder='Phone Number' required/> }
      <input type="password" className='w-full border border-gray-400  px-3 py-2 ' placeholder='Password' required/>
      <div className='flex justify-between w-full text-sm mt-[-8px] '>
        <p className='cursor-pointer hover:underline'>Forgot Password ?</p>
        {
          currentState === "Login" 
          ? <p onClick={() => setCurrentState("Sign up")} className='cursor-pointer'>Create Account</p>
          : <p onClick={() => setCurrentState("Login")} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button type='submit' className='w-full bg-black text-white px-3 py-2'>{currentState}</button>
    </form >
  )
}

export default Login
