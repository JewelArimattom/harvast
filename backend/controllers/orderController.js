import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";



// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send order notification email
const sendOrderNotification = async (orderDetails) => {
  try {
    // Get user details for the email
    const user = await userModel.findById(orderDetails.userId);
    
    const mailOptions = {
      from: `"E-Commerce Store" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📦 New Order #${orderDetails._id} - ₹${orderDetails.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4a5568;">New Order Notification</h1>
          <p style="font-size: 16px;">A new order has been placed on your website.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748; margin-top: 0;">Order Summary</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                <p><strong>Order ID:</strong> ${orderDetails._id}</p>
                <p><strong>Date:</strong> ${new Date(orderDetails.date).toLocaleString()}</p>
                <p><strong>Amount:</strong> ₹${orderDetails.amount}</p>
              </div>
              <div>
                <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
                <p><strong>Payment Status:</strong> ${orderDetails.payment ? '✅ Paid' : '⚠️ Pending'}</p>
                <p><strong>Order Status:</strong> ${orderDetails.status}</p>
              </div>
            </div>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748; margin-top: 0;">Customer Details</h2>
            <p><strong>Name:</strong> ${user?.name || 'Not available'}</p>
            <p><strong>Email:</strong> ${user?.email || 'Not available'}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <h2 style="color: #2d3748; margin-top: 0;">Shipping Address</h2>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${JSON.stringify(orderDetails.address, null, 2)}</pre>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.ADMIN_DASHBOARD_URL}" style="display: inline-block; padding: 10px 20px; background: #4299e1; color: white; text-decoration: none; border-radius: 4px;">View Order in Dashboard</a>
          </div>
        </div>
      `,
      // Text version for non-HTML email clients
      text: `
        New Order Notification
        ======================
        
        Order ID: ${orderDetails._id}
        Date: ${new Date(orderDetails.date).toLocaleString()}
        Amount: ₹${orderDetails.amount}
        Payment Method: ${orderDetails.paymentMethod}
        Payment Status: ${orderDetails.payment ? 'Paid' : 'Pending'}
        Order Status: ${orderDetails.status}
        
        Customer Details:
        - Name: ${user?.name || 'Not available'}
        - Email: ${user?.email || 'Not available'}
        
        Shipping Address:
        ${JSON.stringify(orderDetails.address, null, 2)}
        
        View order in dashboard: ${process.env.ADMIN_DASHBOARD_URL}
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order notification email sent to admin');

    
  } catch (error) {
    console.error('Error sending order notification email:', error);
  }
};

// Verify Razorpay credentials
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials missing in environment variables');
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Cash on Delivery order placement
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Cash on Delivery",
      payment: false,
      date: Date.now(),
      status: "placed"
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Send order notification email (don't await to avoid delaying response)
    sendOrderNotification(newOrder);

    res.status(200).json({ 
      success: true, 
      message: "Order placed successfully",
      orderId: newOrder._id
    });
  } catch (error) {
    console.error("COD Order Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Initialize Razorpay payment
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        userId,
        items: JSON.stringify(items),
        address: JSON.stringify(address)
      }
    };

    const order = await razorpayInstance.orders.create(options);
    
    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment processing failed',
      error: error.message
    });
  }
};

// Validate Razorpay payment and create order
const validateRazorpayPayment = async (req, res) => {
  try {
    const { 
      userId, 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderData 
    } = req.body;

    if (!userId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details'
      });
    }

    // Verify the payment with Razorpay
    const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
    
    if (payment.status === "captured" && payment.order_id === razorpay_order_id) {
      const razorpayOrder = await razorpayInstance.orders.fetch(razorpay_order_id);
      
      const orderToSave = {
        userId,
        items: JSON.parse(razorpayOrder.notes.items),
        amount: razorpayOrder.amount / 100,
        address: JSON.parse(razorpayOrder.notes.address),
        paymentMethod: "Razorpay",
        payment: true,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        date: Date.now(),
        status: "paid"
      };
      
      const newOrder = new orderModel(orderToSave);
      await newOrder.save();
      
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // Send order notification email
      sendOrderNotification(newOrder);
      
      res.status(200).json({ 
        success: true, 
        message: "Payment successful and order created",
        orderId: newOrder._id
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: "Payment verification failed" 
      });
    }
  } catch (error) {
    console.error("Payment Validation Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get all orders (admin)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
      .populate('userId', 'name email')
      .sort({ date: +1 });
    
    res.status(200).json({ 
      success: true, 
      orders 
    });
  } catch (error) {
    console.error("All Orders Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get user orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const orders = await orderModel.find({ userId })
      .sort({ date: +1 });
    
    res.status(200).json({ 
      success: true, 
      orders 
    });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and status are required'
      });
    }

    const validStatuses = ["Order Placed", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status" 
      });
    }
    
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId, 
      { status },
      { new: true } // Return the updated document
    );
    
    // Send notification if order is shipped or delivered
    if (status === "shipped" || status === "delivered") {
      sendOrderNotification(updatedOrder);
    }

    res.status(200).json({ 
      success: true, 
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
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