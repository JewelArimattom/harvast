import express from "express";
import { addProductToCart, updateCartItemQuantity, getUserCart } from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",authUser, addProductToCart);
cartRouter.post("/update",authUser, updateCartItemQuantity);
cartRouter.post("/get",authUser,  getUserCart);

export default cartRouter;