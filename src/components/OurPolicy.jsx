import React from 'react'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-600'>
      <div className=''>
        <img src="https://img.icons8.com/?size=100&id=89813&format=png&color=000000" className='w-12 h-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-sm sm:text-base md:text-lg text-gray-800 '>Easy Exchange Policy</p>
        <p className='text-gray-600 '>If you receive the wrong item, you can Exchange it with in 7 days of delivery or get a refund of the full amount of the product.</p>
      </div>

      <div className=''>
        <img src="https://img.icons8.com/?size=100&id=7731&format=png&color=000000" className='w-12 h-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-sm sm:text-base md:text-lg text-gray-800 '>Customer Support</p>
        <p className='text-gray-600 '>Responsive and reliable, our customer support provides swift solutions and tailored care to ensure your satisfaction.</p>
      </div>

      <div className=''>
        <img src="https://img.icons8.com/?size=100&id=AgOCBy0dWH6w&format=png&color=000000" className='w-12 h-12 m-auto mb-5' alt="" />
        <p className='font-semibold text-sm sm:text-base md:text-lg text-gray-800 '>Best Quality</p>
        <p className='text-gray-600 '>We deliver the best quality, combining excellence, precision, and reliability in every product and service. Your satisfaction is our top priority</p>
      </div>
    </div>
  )
}

export default OurPolicy
