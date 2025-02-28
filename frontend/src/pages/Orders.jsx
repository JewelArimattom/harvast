import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrders = async () => {
    try {
      if (!token) return;

      const res = await axios.post(`${backendUrl}/api/order/user`, {}, { headers: { token } });

      if (res.data.success) {
        const allOrdersItem = res.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );

        setOrderData(allOrdersItem.reverse()); // ✅ Show latest orders first
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token, backendUrl]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => {
            // ✅ Ensure correct image
            const imageUrl = Array.isArray(item.image) ? item.image[0] : item.image || "fallback.jpg";

            // ✅ Extract correct price based on size
            let price = 0;
            if (item.price && typeof item.price === "object") {
              price = item.price[item.size] || 0; // ✅ Get price dynamically per size
            } else {
              price = item.price || 0; // ✅ Default price if not size-based
            }

            return (
              <div
                key={index}
                className="py-4 border-b border-t text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Product Details */}
                <div className="flex items-start gap-6 text-sm">
                  <img className="w-16 sm:w-20" src={imageUrl} alt={item.name || "Product Image"} />
                  <div>
                    <p className="sm:text-base font-medium">{item.name || "Unknown Product"}</p>
                    <div className="flex items-center gap-3 mt-1 text-base text-black">
                      <p>
                        {currency} {price.toFixed(2)}
                      </p>
                      <p>Quantity: {item.quantity || 1}</p>
                      <p>Size: {item.size || "N/A"}</p>
                    </div>
                    <p className="mt-1">
                      Date: <span>{item.date ? new Date(item.date).toDateString() : "N/A"}</span>
                    </p>
                    <p className="mt-1">
                      Payment Method: <span>{item.paymentMethod || "N/A"}</span>
                    </p>
                  </div>
                </div>

                {/* Order Status & Track Button */}
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">{item.status || "Pending"}</p>
                  </div>
                  <button
                    onClick={loadOrders}
                    className="border border-gray-400 px-4 py-2 bg-black text-white text-sm font-medium"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-6">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
