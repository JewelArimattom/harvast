import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const itemId in cartItems) {
        const productData = products.find((p) => p._id === itemId);

        if (!productData) {
          continue;
        }

        for (const size in cartItems[itemId]) {
          const quantity = Number(cartItems[itemId][size]) || 0;

          if (quantity > 0) {
            const sizeIndex = productData.sizes?.indexOf(size) ?? -1;
            const price = sizeIndex !== -1 && productData.price?.[sizeIndex] !== undefined
              ? parseFloat(productData.price[sizeIndex])
              : parseFloat(productData.price?.[0]) || 0;

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

      setCartData(tempData);
      setIsEmpty(tempData.length === 0);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t border-red-600 bg-black text-white min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 h-full">
        <div className="text-2xl mb-6">
        <div className='flex items-center gap-2 mt-4'>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                            <p className='font-semibold text-xl md:text-xl text-white'>YOUR</p>
                            <p className='font-semibold text-xl md:text-xl text-red-500'>CART</p>
                            <div className='w-8 md:w-11 h-[1px] bg-red-600'></div>
                        </div>        </div>
        
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] w-full py-20">
            <div className="mx-auto w-24 h-24 mb-6 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-400 mb-2">Your cart is empty</h3>
            <p className="text-gray-300 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link 
              to="/" 
              className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              {cartData.map((item, index) => {
                const totalPrice = (item.price * item.quantity).toFixed(2);

                return (
                  <div 
                    key={index} 
                    className="flex gap-4 justify-between items-center border-b border-red-600 py-4 px-2 sm:px-4 hover:bg-gray-900 transition-colors w-full"
                  >
                    <div className="flex items-center gap-6 w-full">
                      <img 
                        className="w-16 sm:w-20 border border-red-600 rounded" 
                        src={item.image} 
                        alt={item.name} 
                      />
                      <div className="flex-grow">
                        <p className="text-sm sm:text-lg font-medium text-white">{item.name}</p>
                        <div className="flex items-center gap-2 text-sm sm:text-base mt-1">
                          <p className="text-gray-300">
                            {currency}{item.price} × {item.quantity} = 
                            <b className="text-red-400 ml-1">{currency}{totalPrice}</b>
                          </p>
                          <p className="px-2 sm:px-3 sm:py-1 border border-red-600 bg-gray-800 text-white rounded">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value > 0) updateQuantity(item._id, item.size, value);
                        }}
                        className="border border-red-600 bg-gray-800 text-white max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center rounded"
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                      />

                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="text-red-500 hover:text-red-300 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full mt-auto">
              <div className="w-full sm:w-[450px] ml-auto">
                <CartTotal cartData={cartData} currency={currency} />
                <div className="mt-4">
                  <button
                    onClick={() => {
                      const cartAmount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
                      if (cartAmount < 400) {
                        toast.error("Minimum Order Value is Rs. 400");
                      } else {
                        if (!token) {
                          navigate("/login");
                          toast.error("Please login to place an order");
                        } else {
                          navigate("/placeorder");
                        }
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-md font-bold transition-colors"
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;