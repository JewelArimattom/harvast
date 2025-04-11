import express from 'express';
import { placeOrder, allOrders, userOrders, updateOrderStatus,placeOrderRazorpay, validateRazorpayPayment } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/user',authUser, userOrders);
orderRouter.post('/status',adminAuth, updateOrderStatus);
orderRouter.post('/placeRazorpay',authUser, placeOrderRazorpay);
orderRouter.post('/validateRazorpayPayment',authUser,validateRazorpayPayment);


export default orderRouter;