import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //  Ensure navigation works
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { token, setCartItems, cartItems, backendUrl, products, currency } = useContext(ShopContext);
  const navigate = useNavigate(); //  Correctly initialized
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

  //  Generate cartData properly
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = Number(cartItems[itemId][size]) || 0;
          if (quantity > 0) {
            const productData = products.find((product) => product._id === itemId);
            if (productData) {
             
              let price = 0;

              //  Ensure correct price mapping per size
              if (Array.isArray(productData.price)) {
                
              
                // Define a size mapping (update this according to your database)
                const sizeMapping = ["100g", "200g", "250g", "500g"]; // Example
              
                const index = sizeMapping.indexOf(size);
                if (index !== -1 && productData.price[index] !== undefined) {
                  price = parseFloat(productData.price[index]);
                } else {
                }
              } else {
                price = parseFloat(productData.price) || 0;
              }
              

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
      setCartData([]); //  Handle empty cart
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
        headers: { token }, //  Proper header
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
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Section - Address Form */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="YOUR" text2="ADDRESS" />
        </div>
        <div className="flex gap-3">
          <input onChange={handleChange} name="fname" value={formData.fname} required type="text" placeholder="First Name" className="border px-3 py-2 w-full" />
          <input onChange={handleChange} name="lname" value={formData.lname} required type="text" placeholder="Last Name" className="border px-3 py-2 w-full" />
        </div>
        <input onChange={handleChange} name="address" value={formData.address} required type="text" placeholder="Address" className="border px-3 py-2 w-full" />
        <input onChange={handleChange} name="address2" value={formData.address2} type="text" placeholder="Address Line 2 (Optional)" className="border px-3 py-2 w-full" />
        <div className="flex gap-3">
          <input onChange={handleChange} name="city" value={formData.city} required type="text" placeholder="City" className="border px-3 py-2 w-full" />
          <input onChange={handleChange} name="state" value={formData.state} required type="text" placeholder="State" className="border px-3 py-2 w-full" />
          <input onChange={handleChange} name="pincode" value={formData.pincode} required type="text" placeholder="Pin Code" className="border px-3 py-2 w-full" />
        </div>
        <input onChange={handleChange} name="country" value={formData.country} required type="text" placeholder="Country" className="border px-3 py-2 w-full" />
        <div className="flex gap-3">
          <input onChange={handleChange} name="phone" value={formData.phone} required type="text" placeholder="Phone Number" className="border px-3 py-2 w-full" />
          <input onChange={handleChange} name="email" value={formData.email} required type="email" placeholder="Email" className="border px-3 py-2 w-full" />
        </div>
      </div>

      {/* Right Section - Cart Summary & Payment */}
      <div className="mt-8">
        {/* Cart Summary */}
        <CartTotal cartData={cartData} currency={currency} />

        {/* Payment Method */}
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod("stripe", toast.info("This feature is under development, please use cash on delivery"))} className="flex items-center gap-3 border px-3 py-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === "stripe" ? "bg-green-500" : ""}`}></p>
              <p>Credit/Debit Card (Stripe)</p>
            </div>
            <div onClick={() => setMethod("razorpay", toast.info("This feature is under development, please use cash on delivery"))} className="flex items-center gap-3 border px-3 py-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === "razorpay" ? "bg-green-500" : ""}`}></p>
              <p>Razorpay</p>
            </div>
            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border px-3 py-2 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === "cod" ? "bg-green-500" : ""}`}></p>
              <p>Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="w-full text-end mt-8">
          <button type="submit" className="bg-black text-white px-16 py-3 text-sm">Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
