import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './Productitem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 8));
      setIsLoading(false);
    }
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"SPICE"} text2={"COLLECTION"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Join us in celebrating the legacy of Kerala's spices, where tradition meets purity in every pinch.
        </p>
      </div>

      {/* Product Grid - Shows skeleton when loading */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {isLoading ? (
          // Skeleton Loader (8 items)
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-md"></div>
              <div className="mt-2 bg-gray-200 h-4 rounded w-3/4"></div>
              <div className="mt-1 bg-gray-200 h-4 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          // Actual Products
          latestProducts.map((item, index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} 
            />
          ))
        )}
      </div>
    </div>
  )
}

export default LatestCollection;