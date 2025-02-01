import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const NavBar = () => {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className='bg-white flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}>
      <h2 className='text-2xl font-bold text-gray-800 md:text-3xl cursor-pointer '>HARVAST</h2>
      </Link>

      <ul className='hidden sm:flex gap-5 text-gray-700 text-sm'>

        <NavLink to={'/'} className='flex flex-col items-center gap-1 hover:text-red-500' >
          <p>HOME</p>
          <hr className='w-2/4 border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>
        <NavLink to={'/collection'} className='flex flex-col items-center gap-1 hover:text-red-500' >
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>
        <NavLink to={'/about'} className='flex flex-col items-center gap-1 hover:text-red-500' >
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>
        <NavLink to={'/contact'} className='flex flex-col items-center gap-1 hover:text-red-500' >
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-0.5 bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" className='w-5  cursor-pointer ' alt=""/>
        <div className='group relative'>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className='w-5 cursor-pointer ' alt=""  />
          <div className='absolute pt-4 right-0 bg-white hidden group-hover:block dropdown-menu '>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-700 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logo Out</p>

            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
        <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" className='w-5 cursor-pointer min-w-5 ' alt="" />
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>10</p>
        </Link>
        <img onClick={() => setVisible(!visible)} src="https://img.icons8.com/?size=100&id=CmEF51FjGPYD&format=png&color=000000" className=' w-5 cursor-pointer sm:hidden 'alt=""/>

      </div>
     {/* mobile nav */} 
      <div className={`${visible ? 'block' : 'hidden'} absolute top-0 left-0 w-full h-full bg-white z-20`}>
        <div className='flex flex-col text-gray-700'>
          <div onClick={() => setVisible(!visible)} className='flex items-center gap-4 p-3'>
            <img src="https://img.icons8.com/?size=100&id=37214&format=png&color=000000" className='w-5 cursor-pointer rotate-180 ' alt="" />
            <p className='cursor-pointer'>Back</p>
          </div>
          <NavLink onClick={() => setVisible(!visible)} to={'/'} className='flex flex-col items-center gap-1 hover:text-red-500' >
            <p>HOME</p>
            <hr className='w-2/4 border-none h-0.5 bg-gray-700' />
          </NavLink>
          <NavLink onClick={() => setVisible(!visible)} to={'/collection'} className='flex flex-col items-center gap-1 hover:text-red-500' >
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-0.5 bg-gray-700' />
          </NavLink>
          <NavLink onClick={() => setVisible(!visible)} to={'/about'} className='flex flex-col items-center gap-1 hover:text-red-500' >
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-0.5 bg-gray-700' />
          </NavLink>
          <NavLink onClick={() => setVisible(!visible)} to={'/contact'} className='flex flex-col items-center gap-1 hover:text-red-500' >
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-0.5 bg-gray-700' />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBar
