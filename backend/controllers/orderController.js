//cash on delivery payment method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        const { userId,items ,amount,address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Cash on Delivery",
            payment: false,
            date : Date.now(),
        
        }
        const newOrder = await orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: { } });

        res.status(200).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//payment gateway

//all orders controller for admin
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

//User order data for frontend
const userOrders = async (req, res) => {
    try {
        const{userId} = req.body;
        const orders = await orderModel.find({userId});
        res.status(200).json({success: true, orders}); 
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// update order status
const updateOrderStatus = async (req, res) => {
   try {
    const {orderId, status} = req.body;
    await orderModel.findByIdAndUpdate(orderId, {status});
    res.status(200).json({success: true, message: "Order status updated successfully"});
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   } 
}

export { placeOrder, allOrders, userOrders, updateOrderStatus };