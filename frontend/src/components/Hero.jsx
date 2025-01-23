import React from 'react'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* left */}
            <div className='flex items-center justify-center py-10 sm:py-0 w-full sm:w-1/2'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>OUR BEST SELLER</p>
                    </div>
                    <h1 className='font-bold text-3xl sm:py-3 md:text-4xl leading-relaxed'>Latest Collection</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                    </div>
                </div>

            </div>
            {/* right */}
            <img className='w-full sm:w-1/2 ' src="https://media.istockphoto.com/id/513536380/photo/indian-spices.jpg?s=2048x2048&w=is&k=20&c=83fkqhixp6vspueXUq8S6WooaijEZo7FzL62brZC4ZY=" alt="" />
        </div>
    )
}

export default Hero
