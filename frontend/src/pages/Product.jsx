import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { ShopContext } from "../context/ShopContext";
import RelatedProduct from "../components/relatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  // Ensure products is always an array
  const productsArray = Array.isArray(products) ? products : [];

  // State for product data, selected image, and size
  const [productdata, setProductdata] = useState(null);
  const [imageIndex, setImageIndex] = useState(0); // Track the current image index
  const [size, setSize] = useState("");

  // Load product data
  useEffect(() => {
    const foundProduct = productsArray.find((item) => item._id === productId);
    if (foundProduct) {
      setProductdata(foundProduct);
      setImageIndex(0); // Start with the first image
      if (foundProduct.sizes?.length > 0) {
        setSize(foundProduct.sizes[0]);
      }
    }
  }, [productId, productsArray]);

  // Swipe handlers for mobile screens
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Swipe left: go to the next image
      setImageIndex((prev) => (prev + 1) % productdata.image.length);
    },
    onSwipedRight: () => {
      // Swipe right: go to the previous image
      setImageIndex((prev) => (prev - 1 + productdata.image.length) % productdata.image.length);
    },
    preventScrollOnSwipe: true, // Prevent scrolling while swiping
    trackMouse: true, // Enable mouse swiping for desktop testing
  });

  if (!productdata || !productdata.image) {
    return <div className="text-center text-2xl font-bold text-gray-600 animate-pulse">Loading...</div>;
  }

  const selectedIndex = productdata.sizes?.indexOf(size) ?? 0;
  const selectedPrice = productdata.price?.[selectedIndex] ?? productdata.price?.[0] ?? 0;
  const selectedOldPrice = productdata.oldPrice?.[selectedIndex] ?? productdata.oldPrice?.[0] ?? 0;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Info */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails for Desktop */}
          <div className="hidden sm:flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productdata.image.map((item, index) => (
              <img 
                onClick={() => setImageIndex(index)} 
                src={item} 
                key={index} 
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" 
                alt={productdata.name} 
              />
            ))}
          </div>

          {/* Main Image with Swipe Gesture for Mobile */}
          <div className="w-full sm:w-[80%] relative" {...handlers}>
            <img 
              className="w-full h-auto" 
              src={productdata.image[imageIndex]} 
              alt={productdata.name} 
            />
            {/* Swipe Dots for Mobile */}
            <div className="sm:hidden flex justify-center mt-3">
              {productdata.image.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 mx-1 rounded-full ${
                    index === imageIndex ? "bg-black" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2 text-black">{productdata.name}</h1>
          <p className="text-black mt-5 text-3xl font-medium">{currency} {selectedPrice.toFixed(2)}</p>
          <p className="text-gray-500 mt-2 line-through font-medium">{currency} {selectedOldPrice.toFixed(2)}</p>
          <p>{productdata.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-3">
              {productdata.sizes.map((item, index) => (
                <button 
                  onClick={() => setSize(item)} 
                  key={index} 
                  className={`border py-2 px-4 bg-white hover:bg-gray-200 ${
                    item === size ? "border-black text-red-500 bg-gray" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button 
            onClick={() => addToCart(productdata._id, size)} 
            className="w-full py-3 bg-black text-white font-medium sm:text-lg sm:py-4 active:bg-gray-600"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm-w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Products</p>
            <p>Pay on Delivery might be available</p>
            <p>Easy 30 days returns and exchanges</p>
          </div>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProduct category={productdata.category} />
    </div>
  );
};

export default Product;