
import e from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const currency = "INR";

// paymet method initialization
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//place order cod
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

//payment gateway for razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId,items ,amount,address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date : Date.now(),
        
        }
        const newOrder = await orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency : currency.toUpperCase(),
            receipt: newOrder._id.toString(),  
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error.message });
            } else {
                res.status(200).json({ success: true, order });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//validate razorpay payment
const validateRazorpayPayment = async (req, res) => {
    try {
        const { userId, razorpay_order_id, } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === "paid") {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: { } });
            res.status(200).json({ success: true, message: "Payment successful" });
        }
        else {
            res.status(400).json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        }
    }


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

export { placeOrder, allOrders, userOrders, updateOrderStatus, placeOrderRazorpay, validateRazorpayPayment };