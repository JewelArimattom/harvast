import React from 'react'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={"Contact"} text2={"Us"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 justify-center'>
        <img className='w-full md:max-w-[450px]' src="https://i.pinimg.com/736x/a4/18/c2/a418c2fba3a5080f1554bab58ad88f3b.jpg" alt="" />
        <div className='flex flex-col justify-center gap-6 items-start'>
        <p className='font-semibold text-sm sm:text-base md:text-lg'>Our Location</p>
        <p> India, Kerala,Kottyam</p>
        <p className='font-semibold text-sm sm:text-base md:text-lg'>Contact</p>
          <p>+91 9061336064<br></br>
          Harvast@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
