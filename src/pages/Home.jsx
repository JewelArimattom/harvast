import React from 'react'
import Hero from '../components/Hero'
import LatestColletion from '../components/LatestColletion'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestColletion/>
      {/* <BestSeller/> */}
      <OurPolicy/>
    </div>
  )
}

export default Home
