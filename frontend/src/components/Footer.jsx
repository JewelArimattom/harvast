import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black py-20 text-gray-600 px-10 md:px-20 pt-1 pb-1 '>
      <div className='flex flex-col sm:grid grid-cols-[3fr,1fr,1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            {/* <img src="" alt="" /> */}
            <h2 className='text-2xl font-bold text-white md:text-3xl cursor-pointer mb-5 '>HARVAST</h2>
            <p className='w-full md:w-2/3 text-gray-500'>
            asdasdsadasdasdasdasdadasdasdadadaasdasdasdadssadasdasdasdasd adsadadasdadasdasdasadadsadadasasdasdasd wafafafafafafsafgvasgdfvasdsadgtsadsafdvf asghdfsaydfsatfdaysftasydfyasdffvdasyfv
            </p>
        </div>
        <div>
            <p className='font-semibold text-sm sm:text-base md:text-lg text-white '>COMPANY</p>
            <ul className='text-gray-500 flex flex-col gap-1'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-x1 font-medium md-5 text-white '>GET IN TOUCH</p>
            <ul className='text-gray-500 flex flex-col gap-1'>
                <li>+1-000-000-0000</li>
                <li>HARVAST@gmail.com</li>
                
            </ul>
        </div>
      </div>
      <div>
        <hr className='border border-gray-400'/>
        <p className='py-5 text-sm text-center '>Copyright &copy; 2023 HARVAST</p>
      </div>
    </div>
  )
}

export default Footer
