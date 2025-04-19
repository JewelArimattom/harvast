import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const currency = "INR";

// Payment method initialization
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Helper function to validate Razorpay signature
const validateSignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');
    return generatedSignature === razorpay_signature;
};

// Place COD order
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Cash on Delivery",
            payment: false,
            status: "placed",
            date: new Date(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        
        // Clear user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("COD Order Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to place order",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Initiate Razorpay payment
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        // Create Razorpay order
        const options = {
            amount: Math.round(amount * 100), // Convert to paise
            currency: currency.toUpperCase(),
            notes: {
                userId,
                items: JSON.stringify(items),
                address: JSON.stringify(address)
            }
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        res.status(200).json({
            success: true,
            message: "Razorpay order created",
            order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderData: {
                userId,
                items,
                amount,
                address,
                paymentMethod: "Razorpay"
            }
        });

    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to create Razorpay order",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Verify Razorpay payment and create order
const validateRazorpayPayment = async (req, res) => {
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature, 
            orderData 
        } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderData) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing payment verification details" 
            });
        }

        // Verify payment signature
        const isValidSignature = validateSignature(
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature
        );

        if (!isValidSignature) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid payment signature" 
            });
        }

        // Verify payment status with Razorpay
        const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
        
        if (payment.status !== "captured") {
            return res.status(400).json({ 
                success: false, 
                message: "Payment not captured" 
            });
        }

        // Create order in database
        const newOrder = new orderModel({
            ...orderData,
            payment: true,
            status: "placed",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            date: new Date()
        });

        await newOrder.save();
        
        // Clear user's cart
        await userModel.findByIdAndUpdate(orderData.userId, { cartData: {} });

        res.status(201).json({ 
            success: true, 
            message: "Payment verified and order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("Payment Validation Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to verify payment",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all orders (admin)
const allOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const filter = status ? { status } : {};

        const orders = await orderModel.find(filter)
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('userId', 'name email');

        const total = await orderModel.countDocuments(filter);

        res.status(200).json({ 
            success: true, 
            orders,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error("Get All Orders Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get user orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const { page = 1, limit = 5 } = req.query;

        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID required" 
            });
        }

        const orders = await orderModel.find({ userId })
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await orderModel.countDocuments({ userId });

        res.status(200).json({ 
            success: true, 
            orders,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error("User Orders Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch user orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const validStatuses = ["placed", "confirmed", "shipped", "delivered", "cancelled"];

        if (!orderId || !status) {
            return res.status(400).json({ 
                success: false, 
                message: "Order ID and status required" 
            });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid status value" 
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ 
                success: false, 
                message: "Order not found" 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: "Order status updated",
            order: updatedOrder
        });

    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to update order status",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export { 
    placeOrder, 
    allOrders, 
    userOrders, 
    updateOrderStatus, 
    placeOrderRazorpay, 
    validateRazorpayPayment 
};
