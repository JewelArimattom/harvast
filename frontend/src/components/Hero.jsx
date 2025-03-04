import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (           
         <Link to={'/collection'}>

        <div className='flex flex-col sm:flex-row border border-gray-400' >
            {/* left */}
            <div  className='flex items-center justify-center py-10 sm:py-0 w-full sm:w-1/2'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base text-black'>OUR SPICE COLLECTION</p>
                    </div>
                    <h1 className='prata-regular font-bold text-3xl sm:py-3 md:text-4xl leading-relaxed text-black'>Best Quality Product</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base text-black'>SHOP</p>
                        <p className='font-semibold text-sm md:text-base text-red-600'>NOW</p>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                    </div>
                </div>

            </div>
            {/* right , image in hero */}
            <img className='w-full sm:w-1/2 ' src="https://iili.io/33VgT0b.md.png" alt="" />
        </div>
        </Link>
    )
}

export default Hero



