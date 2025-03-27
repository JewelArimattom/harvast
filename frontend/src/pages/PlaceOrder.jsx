import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { token, setCartItems, cartItems, backendUrl, products, currency } = useContext(ShopContext);
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");
  const [cartData, setCartData] = useState([]);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    email: "",
    phone: "",
  });

  const getPriceForSize = (productData, size) => {
    if (!productData || !productData.sizes || !productData.price) return 0;
    const sizeIndex = productData.sizes.indexOf(size);
    if (sizeIndex !== -1 && productData.price[sizeIndex] !== undefined) {
      return parseFloat(productData.price[sizeIndex]);
    }
    return parseFloat(productData.price[0]) || 0;
  };

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = Number(cartItems[itemId][size]) || 0;
          if (quantity > 0) {
            const productData = products.find((product) => product._id === itemId);
            if (productData) {
              const price = getPriceForSize(productData, size);
              tempData.push({
                _id: itemId,
                size,
                quantity,
                price,
                image: productData.image?.[0] || "",
                name: productData.name || "Unknown Product",
              });
            }
          }
        }
      }
      setCartData(tempData);
    } else {
      setCartData([]);
    }
  }, [cartItems, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      toast.error("Please login to place an order");
      return;
    }

    let totalAmount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = totalAmount > 0 ? 100 : 0;
    totalAmount += deliveryFee;

    let orderData = {
      address: formData,
      items: cartData,
      amount: totalAmount,
      paymentMethod: method,
    };

    try {
      const res = await axios.post(`${backendUrl}/api/order/place`, orderData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success("Order placed successfully");
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row justify-between gap-8 pt-14 min-h-[80vh] border-t border-red-600 bg-black text-white p-4 sm:p-8">
      {/* Left Section - Address Form */}
      <div className="flex flex-col gap-6 w-full lg:max-w-[600px]">
        <div className="text-2xl mb-2">
        <div className='flex items-center gap-2 mt-4'>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                            <p className='font-semibold text-xl md:text-xl  text-white'>YOUR</p>
                            <p className='font-semibold text-xl md:text-xl text-red-500'>ADDRESS</p>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                        </div>        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">First Name</label>
            <input 
              onChange={handleChange} 
              name="fname" 
              value={formData.fname} 
              required 
              type="text" 
              className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Last Name</label>
            <input 
              onChange={handleChange} 
              name="lname" 
              value={formData.lname} 
              required 
              type="text" 
              className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Address</label>
          <input 
            onChange={handleChange} 
            name="address" 
            value={formData.address} 
            required 
            type="text" 
            className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Address Line 2 (Optional)</label>
          <input 
            onChange={handleChange} 
            name="address2" 
            value={formData.address2} 
            type="text" 
            className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">City</label>
            <input 
              onChange={handleChange} 
              name="city" 
              value={formData.city} 
              required 
              type="text" 
              className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">State</label>
            <input 
              onChange={handleChange} 
              name="state" 
              value={formData.state} 
              required 
              type="text" 
              className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Pin Code</label>
            <input 
              onChange={handleChange} 
              name="pincode" 
              value={formData.pincode} 
              required 
              type="text" 
              className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Country</label>
          <input 
            onChange={handleChange} 
            name="country" 
            value={formData.country} 
            required 
            type="text" 
            className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Phone Number</label>
            <input 
              onChange={handleChange} 
              name="phone" 
              value={formData.phone} 
              required 
              type="text" 
              className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>
            <input 
              onChange={handleChange} 
              name="email" 
              value={formData.email} 
              required 
              type="email" 
              className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Right Section - Cart Summary & Payment */}
      <div className="w-full lg:max-w-[450px] mt-8 lg:mt-0">
        {/* Cart Summary */}
        <CartTotal cartData={cartData} currency={currency} />

        {/* Payment Method */}
        <div className="mt-8">
          <div className="text-2xl mb-4">
            <Title text1="PAYMENT" text2="METHOD" textColor="text-white" accentColor="text-red-400" />
          </div>
          
          <div className="flex flex-col gap-3">
            <div 
              onClick={() => setMethod("stripe", toast.info("This feature is under development, please use cash on delivery"))} 
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer rounded-lg transition-colors ${
                method === "stripe" ? "border-red-500 bg-gray-900" : "border-red-600 hover:bg-gray-900"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                method === "stripe" ? "border-red-500 bg-red-500" : "border-red-600"
              }`}>
                {method === "stripe" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <p>Credit/Debit Card (Stripe)</p>
            </div>
            
            <div 
              onClick={() => setMethod("razorpay", toast.info("This feature is under development, please use cash on delivery"))} 
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer rounded-lg transition-colors ${
                method === "razorpay" ? "border-red-500 bg-gray-900" : "border-red-600 hover:bg-gray-900"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                method === "razorpay" ? "border-red-500 bg-red-500" : "border-red-600"
              }`}>
                {method === "razorpay" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <p>Razorpay</p>
            </div>
            
            <div 
              onClick={() => setMethod("cod")} 
              className={`flex items-center gap-3 border px-4 py-3 cursor-pointer rounded-lg transition-colors ${
                method === "cod" ? "border-red-500 bg-gray-900" : "border-red-600 hover:bg-gray-900"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                method === "cod" ? "border-red-500 bg-red-500" : "border-red-600"
              }`}>
                {method === "cod" && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <p>Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="w-full mt-8">
          <button 
            type="submit" 
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-lg font-bold transition-colors"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;