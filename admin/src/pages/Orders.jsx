import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const featchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })
      if (res.data.success) {
        setOrders(res.data.orders);
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    featchAllOrders();
  }, [token]);
  return (
    <div>
      <h1>Order List</h1>
      <div>
        {orders.map((order, index) => (
          <div className='grid grid-cols-1 sm:grid-col-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs md:text-sm' key={index}>
            <img className='w-12' src="https://img.icons8.com/?size=100&id=65351&format=png&color=000000" alt="" />
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p className='py-0.5' key={index}>{item.name} X {item.quantity} X <span>{item.size}</span></p>

                  }
                  else {
                    return <p className='py-0.5' key={index}>{item.name} X {item.quantity} X <span> {item.size}</span> ,</p>

                  }
                })}
              </div>
              <p className='mt-3 mb-2 font-bold'>{order.address.fname + " " + order.address.lname}</p>
              <div>
                <p className='py-0.5'>{order.address.city + ", "} {order.address.state + ", "} {order.address.pincode + ", "} {order.address.country}</p>
              </div>
              <p>{order.address.phone}</p>

            </div>
            <div className='flex flex-col'>
              <p>Iteam : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Paid" : "Unpaid"}</p>
              <p>Date : {new Date(order.date).toDateString()}</p>
            </div>
            <p >{currency} {order.amount}</p>
            <select className='border-2 p-2 rounded '>
              <option value="Order Placed">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))
        }
      </div>
    </div>

  )
}

export default Orders
