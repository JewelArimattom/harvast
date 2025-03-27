import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (           
        <Link to={'/collection'} className="hover:opacity-95 transition-opacity">
            <div className='flex flex-col sm:flex-row bg-black border-b border-red-800'>
                {/* Left Content */}
                <div className='flex items-center justify-center py-10 sm:py-0 w-full sm:w-1/2 bg-black'>
                    <div className='text-white px-6 sm:px-12'>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                            <p className='font-medium text-sm md:text-base text-red-400'>OUR SPICE COLLECTION</p>
                        </div>
                        <h1 className='font-bold text-3xl sm:py-3 md:text-4xl leading-relaxed text-white'>
                            <span className='block'>Best Quality</span>
                            <span className='text-red-600'>Spices</span>
                        </h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                            <p className='font-semibold text-sm md:text-base text-white'>SHOP</p>
                            <p className='font-semibold text-sm md:text-base text-red-500'>NOW</p>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className='w-full sm:w-1/2 relative'>
                    <img 
                        className='w-full h-full object-cover' 
                        src="https://media.istockphoto.com/id/168738383/photo/spices.jpg?s=612x612&w=0&k=20&c=EHn1AqYjfKtdMBcrWVuEEs9uDErJrMBJTplVE7P3_Fw=" 
                        alt="Premium Kerala Spices" 
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-black/30 to-transparent sm:bg-gradient-to-l'></div>
                </div>
            </div>
        </Link>
    )
}

export default Hero