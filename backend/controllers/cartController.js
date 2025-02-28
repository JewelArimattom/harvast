import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// 🔑 **Extract user ID from Token**
const getUserIdFromToken = (req) => {
    try {
        const token = req.headers.token;
        if (!token) return null;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id;
    } catch (error) {
        return null;
    }
};

// 🛒 **Add Product to Cart**
const addProductToCart = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const { itemId, size } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) return res.status(404).json({ success: false, message: "User not found" });

        let cartData = userData.cartData || {}; // Ensure cart exists

        // ✅ **Fix: Initialize `cartData[itemId]` properly**
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.status(200).json({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error in addProductToCart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// 🔄 **Update Cart Item Quantity**
const updateCartItemQuantity = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const { itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) return res.status(404).json({ success: false, message: "User not found" });

        let cartData = userData.cartData || {}; // Ensure cartData exists
        if (!cartData[itemId]) cartData[itemId] = {}; // Fix for undefined error

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.status(200).json({ success: true, message: "Cart item quantity updated successfully" });
    } catch (error) {
        console.error("Error in updateCartItemQuantity:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// 📦 **Get User's Cart**
const getUserCart = async (req, res) => {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

        const userData = await userModel.findById(userId);
        if (!userData) return res.status(404).json({ success: false, message: "User not found" });

        const cartData = userData.cartData || {}; // Ensure cartData exists
        res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export { addProductToCart, updateCartItemQuantity, getUserCart };
