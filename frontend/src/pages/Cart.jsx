import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

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
            // Use the product's sizes array for dynamic size mapping
            const sizeIndex = productData.sizes?.indexOf(size) ?? -1;
            const price = sizeIndex !== -1 && productData.price?.[sizeIndex] !== undefined
              ? parseFloat(productData.price[sizeIndex])
              : parseFloat(productData.price?.[0]) || 0; // Fallback to the first price

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
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.map((item, index) => {
          const totalPrice = (item.price * item.quantity).toFixed(2);

          return (
            <div key={index} className="flex gap-4 justify-between items-center border-b py-4 px-2 sm:px-4">
              <div className="flex items-center gap-6">
                <img className="w-16 sm:w-20" src={item.image} alt={item.name} />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <p>{currency}{item.price} × {item.quantity} = <b>{currency}{totalPrice}</b></p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-gray-100">{item.size}</p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) updateQuantity(item._id, item.size, value);
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 flex items-center justify-center"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 cursor-pointer sm:w-6 flex"
                src="https://img.icons8.com/?size=100&id=8329&format=png&color=000000"
                alt="Remove"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
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
              className="bg-black text-white w-full py-2"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;