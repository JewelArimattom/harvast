import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { useState } from 'react';


const Orders = () => {

  const {backendUrl, token, currency} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrders = async () => {
    try {
      if(!token){
        return null
      } 
      const res = await axios.post(backendUrl + '/api/order/user',{}, {headers : {token}});
      if (res.data.success) {
        let allOrdersItem = []
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
      <Title text1={"MY"} text2={"ORDERS"} />
      </div>
     <div>
      {
        orderData.map((item, index) => (
          <div key={index} className='py-4 border-b border-t text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-black'>
                  <p >{currency} {item.price}.00</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>  
                <p className='mt-1'>Date: <span>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment Method: <span>{item.paymentMethod}</span></p>
              </div>
            </div>
             <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrders} className='border border-gray-400 px-4 py-2 bg-black text-white text-sm font-medium'>Track Order</button>
             </div>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default Orders
