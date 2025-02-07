import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {

  const {products, currency} = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
      <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {
          products.slice(0,3).map((item,index) => {
            return (
              <div key={index} className='flex items-center justify-between border-b py-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 sm:w-20 bg-gray-100'>
                    <img src={item.image[0]} alt="" />
                  </div>
                  <div>
                    <p className='font-semibold'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-2 text-base text-gray-500'>
                      <p className='text-lg text-black'>{currency} {item.price}</p>
                      <p className='text-black'>Quantity: 1</p>
                      <p className='text-black'>Size: 100g</p>
                    </div>
                    <p className='mt-2'>Date: <span className='text-gray-500'>25/05/2023</span> </p>
                  </div>
                </div>  
                <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-black'>Delivered</p>
                </div>
                <button className='bg-black text-white px-4 py-2'>Track Order</button>
                </div>
               </div>
            )
        })}
      </div>
    </div>
  )
}

export default Orders
