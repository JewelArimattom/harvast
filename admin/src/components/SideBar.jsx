import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='w-[18%] h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-black text-[15px]'>
        {/* Add Product */}
        <NavLink to={'/add'} className='flex items-center gap-3 hover:text-red-500 border-1 py-2 px-3 rounded-l'>
          <img className='w-7 h-7' src="https://img.icons8.com/?size=100&id=24717&format=png&color=000000" alt="Add Product" />
          <p className='hidden md:block sm:block'>Add Product</p>
        </NavLink>

        {/* Product List */}
        <NavLink to={'/list'} className='flex items-center gap-3 hover:text-red-500 border-1 py-2 px-3 rounded-l'>
          <img className='w-7 h-7' src="https://img.icons8.com/?size=100&id=95645&format=png&color=000000" alt="Product List" />
          <p className='hidden md:block sm:block'>Product List</p>
        </NavLink>

        {/* Order List */}
        <NavLink to={'/orders'} className='flex items-center gap-3 hover:text-red-500 border-1 py-2 px-3 rounded-l'>
          <img className='w-7 h-7' src="https://img.icons8.com/?size=100&id=Ot2P5D5MPltM&format=png&color=000000" alt="Order List" />
          <p className='hidden md:block sm:block'>Order List</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;