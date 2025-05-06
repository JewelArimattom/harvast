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
  const [method, setMethod] = useState("razorpay");
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

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment harvest",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(`${backendUrl}/api/order/validateRazorpayPayment`, response, { headers: { token } });
          if (data.success) {
            toast.success("Payment Successfull");
            setCartItems({});
            navigate("/orders");
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      toast.error("Please login to place an order");
      return;
    }

    let totalAmount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = totalAmount > 1500 ? 0 : 50;
    totalAmount += deliveryFee;

    const orderData = {
      address: formData,
      items: cartData,
      amount: totalAmount,
      paymentMethod: method,
      payment: false,
    };

    try {
      if (method === "cod") {
        const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
          headers: { token },
        });
        if (response.data.success) {
          toast.success(response.data.message);
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } else if (method === "razorpay") {
        const razorpayResponse = await axios.post(`${backendUrl}/api/order/placeRazorpay`, orderData, {
          headers: { token },
        });

        if (razorpayResponse.data.success) {
          initPay(razorpayResponse.data.order);

          
        }
      } else {
        toast.error("Invalid payment method");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-8 pt-14 min-h-[80vh] border-t border-red-600 bg-black text-white p-4 sm:p-8"
    >
      {/* Left Section: Form Fields */}
      <div className="flex flex-col gap-6 w-full lg:max-w-[600px]">
        <div className="flex items-center gap-2 mt-4">
          <div className="w-8 md:w-11 h-[1px] bg-red-600"></div>
          <p className="font-semibold text-xl text-white">YOUR</p>
          <p className="font-semibold text-xl text-red-500">ADDRESS</p>
          <div className="w-8 md:w-11 h-[1px] bg-red-600"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="First Name" name="fname" value={formData.fname} onChange={handleChange} />
          <InputField label="Last Name" name="lname" value={formData.lname} onChange={handleChange} />
        </div>

        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
        <InputField label="Address Line 2 (Optional)" name="address2" value={formData.address2} onChange={handleChange} required={false} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
          <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
          <InputField label="Pin Code" name="pincode" value={formData.pincode} onChange={handleChange} />
        </div>

        <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
        </div>
      </div>

      {/* Right Section: Summary + Payment */}
      <div className="w-full lg:max-w-[450px] mt-8 lg:mt-0">
        <CartTotal cartData={cartData} currency={currency} />

        <div className="mt-8">
          <div className='flex items-center gap-2 mt-4'>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                            <p className='font-semibold text-xl md:text-xl  text-white'>PAYMENT</p>
                            <p className='font-semibold text-xl md:text-xl text-red-600'>METHOD</p>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                        </div>

          <div className="flex flex-col gap-3 mt-4">
            {["razorpay", "cod"].map((option) => (
              <div
                key={option}
                onClick={() => setMethod(option)}
                className={`flex items-center gap-3 border px-4 py-3 cursor-pointer rounded-lg transition-colors ${
                  method === option ? "border-red-500 bg-gray-900" : "border-red-600 hover:bg-gray-900"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    method === option ? "border-red-500 bg-red-500" : "border-red-600"
                  }`}
                >
                  {method === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <p className="capitalize">{option === "cod" ? "Cash on Delivery" : "Razorpay"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
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

// Reusable InputField component
const InputField = ({ label, name, value, onChange, type = "text", required = true }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-300">{label}</label>
    <input
      onChange={onChange}
      name={name}
      value={value}
      required={required}
      type={type}
      className="border border-red-600 bg-gray-900 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

export default PlaceOrder;
