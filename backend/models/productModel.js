import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: Array,
            required: true,
            
        },
        category: {
            type: String,
            required: true,
        },
        sizes: {
            type: Array,
            required: true,
        },
        price: {
            type: [Number], // Array of prices
            required: true,
        },
        oldPrice: {
            type: [Number], // Array of old prices or discounts
            required: true,
        },
        bestSeller: {
            type: Boolean,
        },
        date: {
            type: Number,
            required: true,
        },
    },
);

const productModel = mongoose.models.product ||  mongoose.model("product", productSchema);
export default productModel;