import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
       const bestProduct = products
       setBestSellers(bestProduct.slice(0, 4));
    }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        asdasddasasasassaasasasassasasasaasasssasasasaasasassaasasasasaaa
        </p>
      </div>
    </div>
  )
}

export default BestSeller
