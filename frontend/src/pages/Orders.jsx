import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      if (!token) return;

      const res = await axios.post(`${backendUrl}/api/order/user`, {}, { 
        headers: { token } 
      });

      if (res.data.success) {
        const allOrdersItem = res.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token, backendUrl]);

  const getStatusColor = (status) => {
    const statusMap = {
      'completed': 'bg-green-500',
      'processing': 'bg-yellow-500',
      'shipped': 'bg-blue-500',
      'cancelled': 'bg-red-500',
      'delivered': 'bg-green-500'
    };
    return statusMap[status.toLowerCase()] || 'bg-gray-500';
  };

  return (
    <div className="bg-black text-white min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-white">MY </span>
            <span className="text-red-500">ORDERS</span>
          </h1>
          <div className="w-20 h-1 bg-red-500 mx-auto mt-2"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : orderData.length > 0 ? (
          <div className="space-y-4">
            {orderData.map((item, index) => {
              const imageUrl = Array.isArray(item.image) ? item.image[0] : item.image;
              const price = item.price && typeof item.price === "object" 
                ? item.price[item.size] || 0 
                : item.price || 0;

              return (
                <div key={index} className="border border-red-600 rounded p-4 hover:border-red-400 transition-colors">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img 
                      className="w-24 h-24 object-contain border border-red-600 rounded" 
                      src={imageUrl} 
                      alt={item.name} 
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-red-400">{item.name}</h3>
                      
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <span className="text-gray-400">Price: </span>
                          <span>{currency}{price.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Qty: </span>
                          <span>{item.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Size: </span>
                          <span>{item.size || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Date: </span>
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></span>
                          <span className="capitalize">{item.status}</span>
                        </div>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">
                          Track
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto w-20 h-20 mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No orders yet</h3>
            <p className="text-gray-400 mb-4">Your order history will appear here</p>
            <a 
              href="/" 
              className="inline-block px-5 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              Shop Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;