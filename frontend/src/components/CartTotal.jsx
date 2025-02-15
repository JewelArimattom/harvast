import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';




const CartTotal = () => {
  const {currency,getCartAmount,deliveryFee} = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
          <Title text1={"TOTAL"} text2={"PRICE"} />
      </div>
      <p >{getCartAmount() < 400 ?<p className={`text-sm text-red-500 bg-red-100 p-2 mt-2 `}
      >"Minimum Order Value should be more than Rs. 500 "</p>: " "}</p>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />   
        <div className='flex justify-between'>
          <p>Delivery Fee</p>
          <p>{currency} {deliveryFee}.00</p>
        </div>
        <hr />   
        <div className='flex justify-between'>
          <p>Total</p>
          <p>{currency}  { getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
