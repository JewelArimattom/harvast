import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  
  // Hide footer on these paths
  const hiddenPaths = ['/login', '/signup']
  if (hiddenPaths.includes(location.pathname)) {
    return null
  }

  return (
    <div className='bg-black pt-20 pb-10 px-6 sm:px-10 lg:px-20'>
      <div className='max-w-7xl mx-auto'>
        {/* Main Footer Content */}
        <div className='flex flex-col sm:grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-16 mb-12'>
          {/* Brand Info */}
          <div>
            <h2 className='text-3xl font-bold text-white mb-6 cursor-pointer'>
              <span className='inline-block hover:rotate-12 transition-transform duration-300'>H</span>
              <span className='inline-block hover:-rotate-12 transition-transform duration-300'>A</span>
              <span className='inline-block hover:rotate-12 transition-transform duration-300'>R</span>
              <span className='inline-block hover:-rotate-12 transition-transform duration-300'>V</span>
              <span className='text-red-600 hover:scale-125 transition-transform duration-300'>A</span>
              <span className='inline-block hover:rotate-12 transition-transform duration-300'>S</span>
              <span className='inline-block hover:-rotate-12 transition-transform duration-300'>T</span>
            </h2>
            <p className='text-gray-400 mb-6 leading-relaxed'>
              At Harvast, we bring you the rich, authentic flavors of Kerala's finest spices, straight from nature to your kitchen. Nestled in the heart of India's spice capital, we are committed to delivering fresh, pure, and aromatic spices sourced directly from local farmers.
            </p>
            <div className='flex space-x-4'>
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <div key={social} className='w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer'>
                  <img 
                    src={`https://img.icons8.com/ios-filled/50/ffffff/${social}.png`} 
                    className='w-4 h-4' 
                    alt={social} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className='font-bold text-lg text-white mb-4 border-b border-red-600 pb-2'>COMPANY</h3>
            <ul className='space-y-3'>
              <li><a href='/' className='text-gray-400 hover:text-red-600 transition-colors'>Home</a></li>
              <li><a href='/about' className='text-gray-400 hover:text-red-600 transition-colors'>About Us</a></li>
              <li><a href='/policy' className='text-gray-400 hover:text-red-600 transition-colors'>Company Policy</a></li>
              <li><a href='/contact' className='text-gray-400 hover:text-red-600 transition-colors'>Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='font-bold text-lg text-white mb-4 border-b border-red-600 pb-2'>GET IN TOUCH</h3>
            <ul className='space-y-3'>
              <li className='flex items-center text-gray-400'>
                <div className='w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-2'>
                  <img 
                    src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" 
                    className='w-3 h-3' 
                    alt="phone" 
                  />
                </div>
                +91 9061336064
              </li>
              <li className='flex items-center text-gray-400'>
                <div className='w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-2'>
                  <img 
                    src="https://img.icons8.com/ios-filled/50/ffffff/mail.png" 
                    className='w-3 h-3' 
                    alt="email" 
                  />
                </div>
                harvastfoodproducts@gmail.com              </li>
              <li className='flex items-center text-gray-400 mt-4'>
                <div className='w-6 h-6 bg-red-600 rounded-full flex items-center justify-center mr-2'>
                  <img 
                    src="https://img.icons8.com/ios-filled/50/ffffff/marker.png" 
                    className='w-3 h-3' 
                    alt="location" 
                  />
                </div>
                Kerala, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className='border-t border-gray-800 pt-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-500 text-sm mb-4 md:mb-0'>
              © {new Date().getFullYear()} HARVAST. All rights reserved.
            </p>
            <div className='flex space-x-6'>
              <span className='text-gray-500 hover:text-red-500 text-sm cursor-pointer transition-colors'>Terms of Service</span>
              <span className='text-gray-500 hover:text-red-500 text-sm cursor-pointer transition-colors'>Privacy Policy</span>
              <span className='text-gray-500 hover:text-red-500 text-sm cursor-pointer transition-colors'>Shipping Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer