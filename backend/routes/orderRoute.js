import express from 'express';
import { placeOrder, allOrders, userOrders, updateOrderStatus } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/list',adminAuth, allOrders);
orderRouter.post('/user',authUser, userOrders);
orderRouter.post('/status',adminAuth, updateOrderStatus);

export default orderRouter;