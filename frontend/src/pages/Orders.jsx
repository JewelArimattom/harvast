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
        products.slice(1,4).map((item, index) => (
          <div key={index} className='py-4 border-b border-t text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-black'>
                  <p className='text-lg'>{currency} {item.price}.00</p>
                  <p>Quantity: 1</p>
                  <p>Size: 100g</p>
                </div>
                <p className='mt-2'>Date: <span>01/01/2023</span></p>
              </div>
            </div>
             <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>Ready to Ship</p>
              </div>
              <button className='border border-gray-400 px-4 py-2 bg-black text-white text-sm font-medium'>Track Order</button>
             </div>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default Orders
