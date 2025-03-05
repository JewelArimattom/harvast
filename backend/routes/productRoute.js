import express from "express";
import { 
  listProducts, 
  addProduct, 
  removeProduct, 
  singleProduct, 
  editProduct // Import the editProduct function
} from '../controllers/productControl.js';
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Route to add a new product
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

// Route to list all products
productRouter.get('/list', listProducts);

// Route to remove a product
productRouter.post('/remove', adminAuth, removeProduct);

// Route to get details of a single product
productRouter.post('/single', singleProduct);

// Route to edit an existing product
productRouter.post(
  '/edit',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  editProduct
);

export default productRouter;