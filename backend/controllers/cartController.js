import userModel from "../models/userModel.js";

// add prduct to user cart

const addProductToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// update cart item quantity
const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.status(200).json({ success: true, message: "Cart item quantity updated successfully" }); 
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



//get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addProductToCart, updateCartItemQuantity, getUserCart };