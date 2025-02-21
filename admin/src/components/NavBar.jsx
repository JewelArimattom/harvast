import React from 'react'

const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between px-[4%] py-2 '>
      <h1 className='text-2xl font-bold text-gray-700 md:text-3xl '>Admin Dashboard</h1>
      <button onClick={() => setToken('')} className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm effects hover:bg-gray-700 '>Logout</button>
    </div>
  )
}

export default NavBar
