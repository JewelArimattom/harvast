import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './Productitem';

const LatestColletion =() => {

  const { products } = useContext(ShopContext);
  const [latestProduts, setLatestProducts] = useState([]);
  useEffect(() => {
    {/* const latestProduts = products.slice(0, 4); */}
    setLatestProducts(products.slice(0, 4));
  }, [])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLETION"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Join us in celebrating the legacy of Kerala’s spices, where tradition meets purity in every pinch.</p>
      </div>



      {/* product */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8'>
        {
         latestProduts.map((item, index)=>(
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
         ))
        }
      </div> 
    </div>
  )
}

export default LatestColletion
