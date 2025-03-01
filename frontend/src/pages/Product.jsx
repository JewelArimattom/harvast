import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../components/relatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productdata, setProductdata] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProduct = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductdata(foundProduct);
      setImage(foundProduct.image[0]);
      
      // Set default size (first size option)
      if (foundProduct.sizes?.length > 0) {
        setSize(foundProduct.sizes[0]);
      }
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  if (!productdata) {
    return <div className="text-center text-2xl font-bold text-gray-600 animate-pulse">Loading...</div>;
  }

  // 🛒 Multi-Price Handling
// Ensure correct price based on selected size
const selectedIndex = productdata.sizes.indexOf(size);
const selectedPrice = productdata.price?.[selectedIndex] || productdata.price?.[0] || 0;
const selectedOldPrice = productdata.oldPrice?.[selectedIndex] || productdata.oldPrice?.[0] || 0;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Info */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productdata.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt={productdata.name} />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productdata.name} />
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
                  className={`border py-2 px-4 bg-white hover:bg-gray-200 ${item === size ? "border-black text-red-500 bg-gray" : ""}`}
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
