import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'


function Cart() {
  const{products,currency,cartItems} = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            tempData.push({_id:items,size:item,quantity:cartItems[items][item]});
          }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"} /> 
      </div>
      <div>
        {
          cartData.map((item,index) => {
            const productData = products.find((product)=> product._id === item._id);
            return(
              <div key={index} className='flex justify-between items-center border-b py-4 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 gap-4 '>
                <div className='flex items-center gap-6'>
                  <img className='w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-36' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-2'>
                      <p >{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-gray-100'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input className='border max-w-10 sm:w-20 px-1 sm:px-2 py-1' type="number" min={1} value={item.quantity} />
              </div>
            )
          }
          )
}
      </div>
    </div>
  )
}

export default Cart
