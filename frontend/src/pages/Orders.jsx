import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [cancelMessage, setCancelMessage] = useState("");

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
            paymentStatus: order.payment === true ||
              (typeof order.payment === 'string' && order.payment.toLowerCase() === 'paid')
              ? 'paid'
              : order.payment === false
                ? 'unpaid'
                : (typeof order.payment === 'string' ? order.payment.toLowerCase() : 'pending'),
            date: order.date,
            orderId: order._id,
            trackingNumber: order.trackingNumber || 'Not assigned yet',
            shippingDate: order.shippingDate, // Added shipping date
            deliveryDate: order.deliveryDate // Added delivery date
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
      'delivered': 'bg-green-500',
      'pending': 'bg-gray-500'
    };
    return statusMap[status.toLowerCase()] || 'bg-yellow-500';
  };

  const getPaymentStatusColor = (status) => {
    const statusMap = {
      'paid': 'bg-green-500',
      'unpaid': 'bg-red-500',
      'pending': 'bg-yellow-500',
      'failed': 'bg-red-500',
      'refunded': 'bg-purple-500'
    };
    return statusMap[status.toLowerCase()] || 'bg-gray-500';
  };

  const getEstimatedDelivery = (order) => {
    switch (order.status.toLowerCase()) {
      case 'processing':
        return 'Preparing your order - expected to ship within 2-3 business days';
      case 'shipped':
        if (order.shippingDate) {
          const shipDate = new Date(order.shippingDate);
          const estDelivery = new Date(shipDate);
          estDelivery.setDate(shipDate.getDate() + 5); // Add 5 days for delivery
          return `Shipped on ${shipDate.toLocaleDateString()} - Expected delivery by ${estDelivery.toLocaleDateString()}`;
        }
        return 'Shipped - Expected delivery within 3-5 business days';
      case 'delivered':
        if (order.deliveryDate) {
          return `Delivered on ${new Date(order.deliveryDate).toLocaleDateString()}`;
        }
        return 'Delivered';
      case 'cancelled':
        return 'Order was cancelled';
      default:
        return 'Processing your order - shipping soon';
    }
  };

  const handleTrackOrder = (orderItem) => {
    setTrackingOrder(orderItem);
  };

  const handleCancelOrder = (orderItem) => {
    setCancelOrder(orderItem);
  };

  const closeTrackingModal = () => {
    setTrackingOrder(null);
  };

  const closeCancelModal = () => {
    setCancelOrder(null);
    setCancelMessage("");
  };

  const sendCancellationEmail = () => {
    const subject = encodeURIComponent("Order Cancellation Request");
    const body = encodeURIComponent(`Order ID: ${cancelOrder.orderId}\nMessage: ${cancelMessage || "Please cancel my order."}`);
    window.location.href = `mailto:jewelat50@gmail.com?subject=${subject}&body=${body}`;
    closeCancelModal();
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
                        <div><span className="text-gray-400">Price: </span><span>{currency}{price.toFixed(2)}</span></div>
                        <div><span className="text-gray-400">Qty: </span><span>{item.quantity}</span></div>
                        <div><span className="text-gray-400">Size: </span><span>{item.size || "N/A"}</span></div>
                        <div><span className="text-gray-400">Date: </span><span>{new Date(item.date).toLocaleDateString()}</span></div>
                      </div>

                      <div className="mt-2 text-sm">
                        <p className="text-gray-400">Delivery Status:</p>
                        <p className="text-white">{getEstimatedDelivery(item)}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800 flex-wrap gap-2">
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></span>
                            <span className="capitalize">{item.status}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getPaymentStatusColor(item.paymentStatus)}`}></span>
                            <span className="capitalize">Payment: {item.paymentStatus}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {["shipped", "delivered", "cancelled"].includes(item.status.toLowerCase()) ? (
                            <button
                              disabled
                              className="px-3 py-1 bg-gray-800 text-gray-500 rounded text-sm cursor-not-allowed"
                              title="Cannot cancel this order"
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              onClick={() => handleCancelOrder(item)}
                              className="px-3 py-1 bg-gray-700 hover:bg-gray-800 rounded text-sm"
                            >
                              Cancel
                            </button>
                          )}

                          <button
                            onClick={() => handleTrackOrder(item)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                          >
                            Track
                          </button>
                        </div>
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
              {/* Empty cart icon */}
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

      {/* Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-600 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-500">Order Tracking</h3>
              <button 
                onClick={closeTrackingModal}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Order ID:</p>
                <p className="text-white">{trackingOrder.orderId}</p>
              </div>
              
              <div>
                <p className="text-gray-400">Product:</p>
                <p className="text-white">{trackingOrder.name}</p>
              </div>
              
              {trackingOrder.trackingNumber && (
                <div>
                  <p className="text-gray-400">Tracking Number:</p>
                  <p className="text-white">{trackingOrder.trackingNumber}</p>
                </div>
              )}
              
              <div>
                <p className="text-gray-400">Status:</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(trackingOrder.status)}`}></span>
                  <span className="capitalize text-white">{trackingOrder.status}</span>
                </div>
              </div>
              
              <div>
                <p className="text-gray-400">Payment Status:</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getPaymentStatusColor(trackingOrder.paymentStatus)}`}></span>
                  <span className="capitalize text-white">
                    {trackingOrder.paymentStatus === 'paid' ? 'Paid' : 
                     trackingOrder.paymentStatus === 'unpaid' ? 'Unpaid' : 
                     trackingOrder.paymentStatus}
                    {trackingOrder.paymentMethod && ` (${trackingOrder.paymentMethod})`}
                  </span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-400">Delivery Information:</p>
                <p className="text-white">{getEstimatedDelivery(trackingOrder)}</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeTrackingModal}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {cancelOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-red-600 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-500">Cancel Order</h3>
              <button onClick={closeCancelModal} className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400">Send a cancellation request for:</p>
              <p className="text-white font-medium">Order ID: {cancelOrder.orderId}</p>
              <p className="text-white">Product: {cancelOrder.name}</p>
              <textarea
                rows={4}
                placeholder="Please explain why you want to cancel this order..."
                className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700"
                value={cancelMessage}
                onChange={(e) => setCancelMessage(e.target.value)}
              />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={closeCancelModal} className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded">Close</button>
              <button onClick={sendCancellationEmail} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Send Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;