import React from "react";
import Title from "./Title";

const CartTotal = ({ cartData = [], currency }) => {
  if (!Array.isArray(cartData)) {
    cartData = [];
  }


  // Calculate subtotal safely
  const subtotal = cartData.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return total + price * quantity;
  }, 0);

  const deliveryFee = subtotal > 0 ? 100 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="TOTAL" text2="PRICE" />
      </div>
      <p className="bg-green-200 p-2 ">Order above Rs 1500 for free delivery</p>
      {subtotal > 0 && subtotal < 400 && (
        <p className="text-sm text-red-500 bg-red-100 p-2 mt-2">
          Minimum Order Value should be more than Rs. 400
        </p>
      )}
      
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>{currency} {deliveryFee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <p>Total</p>
          <p>{currency} {grandTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
