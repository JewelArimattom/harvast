import React from 'react'

const Footer = () => {
  return (
    <div className=' text-white '>
      <div className='flex flex-col sm:grid grid-cols-[3fr,1fr,1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            {/* <img src="" alt="" /> */}
            <h2 className=' text-2xl font-bold text-black md:text-2xl cursor-pointer mb-5 '>
        <font>H</font>
        <font>A</font>
        <font>R</font>
        <font>V</font>
        <font className='text-red-600 lg:text-4xl'>A</font>
        <font>S</font>
        <font>T</font>

            </h2>
            <p className='w-full md:w-2/3 text-gray-500'>
            At Harvast, we bring you the rich, authentic flavors of Kerala’s finest spices, straight from nature to your kitchen. Nestled in the heart of India's spice capital, we are committed to delivering fresh, pure, and aromatic spices sourced directly from local farmers.
            </p>
        </div>
        <div>
            <p className='font-semibold text-sm sm:text-base md:text-lg text-black '>COMPANY</p>
            <ul className='text-gray-500 flex flex-col gap-1'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-x1 font-medium md-5 text-black '>GET IN TOUCH</p>
            <ul className='text-gray-500 flex flex-col gap-1'>
                <li>+91 9061336064</li>
                <li>HARVAST@gmail.com</li>
                
            </ul>
        </div>
      </div>
      <div>
        <hr className='border border-gray-400'/>
        <p className='py-5 text-sm text-center text-black '>Copyright &copy; 2023 HARVAST</p>
      </div>
    </div>
  )
}

export default Footer
