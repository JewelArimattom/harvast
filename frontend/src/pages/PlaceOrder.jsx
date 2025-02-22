import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const {navigate, token, setToken, setCartItems, cartItems, backendUrl,getCartAmount,deliveryFee,products} = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            } 
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      }
      switch (method) {
        //cash on delivery
        case "cod":
          const res = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (res.data.success) {
            toast.success("Order placed successfully");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;
        //online payment
        
        default:
          orderData.paymentMethod = "Cash on Delivery";
          orderData.payment = false;
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
   const name = e.target.name;
   const value = e.target.value;
   setFormData(data=>({...data,[name]:value})) ;
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5  sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"YOUR"} text2={"ADDRESS"} />
        </div>
        <div className='flex gap-3'>
          <input onChange={handleChange} name='fname' value={formData.fname} required  type="text" placeholder='First Name' className='border border-black rounded-md px-3 py-2 w-full' />
          <input onChange={handleChange} name='lname' value={formData.lname} required type="text" placeholder='Last Name' className='border border-black rounded-md px-3 py-2 w-full' />
        </div>
        <input onChange={handleChange} name='address' value={formData.address} required type="text" placeholder='Address' className='border border-black rounded-md px-3 py-2 w-full' />
        <input onChange={handleChange} name='address2' value={formData.address2} required type="text" placeholder='Address Line 2' className='border border-black rounded-md px-3 py-2 w-full' />
        <div className='flex gap-3'>
          <input onChange={handleChange} name='city' value={formData.city} required type="text" placeholder='City' className='border border-black rounded-md px-3 py-2 w-full' />
          <input onChange={handleChange} name='state' value={formData.state} required type="text" placeholder='State' className='border border-black rounded-md px-3 py-2 w-full' />
          <input onChange={handleChange} name='pincode' value={formData.pincode} required type="text" placeholder='Pin Code' className='border border-black rounded-md px-3 py-2 w-full' />
        </div>
        <input onChange={handleChange} name='country' value={formData.country} required  type="text" placeholder='Country' className='border border-black rounded-md px-3 py-2 w-full' />
        <div className='flex gap-3'>
          <input onChange={handleChange} name='phone' value={formData.phone} required type="text" placeholder='Phone Number' className='border border-black rounded-md px-3 py-2 w-full' />
          <input onChange={handleChange} name='email' value={formData.email} required type="text" placeholder='Email' className='border border-black rounded-md px-3 py-2 w-full' />
        </div>
      </div>
    {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
        <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* payment method */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod("stripe" ,toast.info("This feature is under development please use cash on delivery"))} className='flex items-center gap-3 border border-black rounded-md p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-black ${method === "stripe" && "bg-green-500"}`}></p>
              <img className='h-7 max-4 w-49 ' src="data:image/png;base64,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" alt="" />
            </div>
            <div onClick={()=>setMethod("razorpay", toast.info("This feature is under development please use cash on delivery"))} className='flex items-center gap-3 border border-black rounded-md p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-black ${method === "razorpay" && "bg-green-500"}`}></p>
              <img className='h-7 max-4 w-49 ' src="https://sellonboard.com/wp-content/uploads/2021/09/razorpay.png" alt="" />
            </div>
            <div onClick={()=>setMethod("cod")} className='flex items-center gap-3 border border-black rounded-md p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 rounded-full border border-black ${method === "cod" && "bg-green-500"}`}></p>
              <p>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8 '>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm '>Place Order</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
