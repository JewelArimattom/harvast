import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, category, sizes, price, oldPrice } = req.body;

        // Ensure sizes, price, and oldPrice are properly parsed
        const parsedSizes = JSON.parse(sizes || "[]");
        const parsedPrices = JSON.parse(price || "[]");
        const parsedOldPrices = JSON.parse(oldPrice || "[]");

        // Ensure req.files exist before accessing them
        const imageFiles = req.files ? [req.files.image1, req.files.image2, req.files.image3, req.files.image4] : [];
        const validImages = imageFiles.filter(img => img && img[0]).map(img => img[0]);

        // Upload images to Cloudinary
        let imagesUrl = await Promise.all(
            validImages.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        // Construct product data object
        const productData = {
            name,
            description,
            category,
            sizes: parsedSizes,
            price: parsedPrices,
            oldPrice: parsedOldPrices,
            image: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        // Save product to the database
        const product = new productModel(productData);
        await product.save();

        res.status(200).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

// Function to edit an existing product
const editProduct = async (req, res) => {
    try {
        const { id, name, description, category, sizes, price, oldPrice } = req.body;

        // Find the product by ID
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Parse sizes, price, and oldPrice if provided
        const parsedSizes = sizes ? JSON.parse(sizes) : product.sizes;
        const parsedPrices = price ? JSON.parse(price) : product.price;
        const parsedOldPrices = oldPrice ? JSON.parse(oldPrice) : product.oldPrice;

        // Handle image updates if new images are provided
        let imagesUrl = product.image; // Keep existing images by default
        if (req.files) {
            const imageFiles = [req.files.image1, req.files.image2, req.files.image3, req.files.image4];
            const validImages = imageFiles.filter(img => img && img[0]).map(img => img[0]);

            // Upload new images to Cloudinary
            const newImagesUrl = await Promise.all(
                validImages.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                    return result.secure_url;
                })
            );

            // Combine new images with existing images (if any)
            imagesUrl = [...product.image, ...newImagesUrl];
        }

        // Update product data
        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.sizes = parsedSizes;
        product.price = parsedPrices;
        product.oldPrice = parsedOldPrices;
        product.image = imagesUrl;

        // Save the updated product
        await product.save();

        res.status(200).json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        console.error("Error editing product:", error);
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

// Function to list all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to remove a product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

// Function to get details of a single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct, editProduct };