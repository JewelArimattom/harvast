import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle product removal
  const handleRemove = async (productId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id: productId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Product removed successfully');
        // Update the UI by removing the product from the state
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        toast.error('Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Product List</h1>
      <div className='space-y-4'>
        {products.map((product) => (
          <div key={product._id} className='p-4 bg-blue-100 shadow rounded'>
            {/* Product Image */}
            <div className='flex gap-4'>
              {product.image?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className='w-20 h-20 object-cover rounded'
                />
              ))}
            </div>

            {/* Product Name */}
            <h2 className='text-xl font-semibold mt-2'>{product.name}</h2>

            {/* Product Description */}
            <p className='text-gray-600'>{product.description}</p>

            {/* Product Category */}
            <p className='text-gray-600'>Category: {product.category}</p>

            {/* Product Sizes, Prices, and Old Prices */}
            <div className='mt-2'>
              {product.sizes?.map((size, index) => (
                <div key={index} className='flex gap-3'>
                  <p className='font-medium'>{size}:</p>
                  <p className='text-green-600'>
                    {currency} {product.price?.[index]?.toFixed(2)}
                  </p>
                  <p className='text-red-500 line-through'>
                    {currency} {product.oldPrice?.[index]?.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Edit and Remove Buttons */}
            <div className='mt-4 flex gap-3'>
              <Link
                to={`/edit/${product._id}`}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
              >
                Edit
              </Link>
              <button
                onClick={() => handleRemove(product._id)}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;