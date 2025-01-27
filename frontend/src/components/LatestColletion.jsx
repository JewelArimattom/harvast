import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

function LatestColletion() {

    const {products} = useContext(ShopContext)
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLETION"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>awbndabfdavfbasvfasvfaaaaaaaaaaaaaaaaaaaaaaaashvuaufh</p>
      </div>
      
    </div>
  )
}

export default LatestColletion
