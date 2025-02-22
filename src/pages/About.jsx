import React from 'react'
import Title from '../components/Title'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"About"} text2={"Us"}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src='https://i.pinimg.com/736x/eb/5b/e8/eb5be8025b011a8a5b0778ac7def2a5d.jpg'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Welcome to Harvast - The Essence of Kerala's Spices!</p>
            <p>At Harvast, we bring you the rich, authentic flavors of Kerala’s finest spices, straight from nature to your kitchen. Nestled in the heart of India's spice capital, we are committed to delivering fresh, pure, and aromatic spices sourced directly from local farmers.</p>
            <p>With a deep-rooted passion for quality and sustainability, we ensure that every spice we offer is handpicked, sun-dried, and carefully processed to retain its natural essence. From the bold warmth of black pepper to the golden richness of turmeric, our products capture the true spirit of Kerala’s spice heritage.</p>
            <p>Join us in celebrating the legacy of Kerala’s spices, where tradition meets purity in every pinch.</p>
        </div>
      </div>
    </div>
  )
}

export default About
