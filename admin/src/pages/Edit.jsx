import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const Edit = ({ token }) => {
  const { productId } = useParams(); // Get productId from the URL
  const navigate = useNavigate(); // For navigation after updating

  // State for form fields
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [oldPrices, setOldPrices] = useState([]);

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`${backendUrl}/api/product/single`, { productId }, {
          headers: { token },
        });
        if (response.data.success) {
          const product = response.data.product;
          setName(product.name);
          setDescription(product.description);
          setCategory(product.category);
          setSizes(product.sizes);
          setPrices(product.price);
          setOldPrices(product.oldPrice);
        }
      } catch (error) {
        toast.error('Failed to fetch product details');
      }
    };

    fetchProduct();
  }, [productId, token]);

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      formData.append('id', productId); // Include productId for editing
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('price', JSON.stringify(prices));
      formData.append('oldPrice', JSON.stringify(oldPrices));

      const response = await axios.post(`${backendUrl}/api/product/edit`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success('Product updated successfully');
        navigate('/list'); // Redirect to the product list after updating
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Image Upload */}
      <div>
        <p className='text-2xl mb-2'>Upload New Images</p>
        <div className='flex gap-2'>
          {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className='w-15 h-15 cursor-pointer pt-2'
                src={
                  [image1, image2, image3, image4][index]
                    ? URL.createObjectURL([image1, image2, image3, image4][index])
                    : 'https://cdn0.iconfinder.com/data/icons/upload-download-9/24/drag_upload_upload_download_regular_f-1024.png'
                }
                alt={`Upload ${index + 1}`}
              />
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id={`image${index + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className='max-w-[500px] w-full px-3 py-2'
          type='text'
          placeholder='Enter Product Name'
          required
        />
      </div>

      {/* Product Description */}
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='max-w-[500px] w-full px-3 py-2'
          placeholder='Enter Product Description'
          required
        />
      </div>

      {/* Product Category */}
      <div className='w-full'>
        <p className='mb-2'>Product Category</p>
        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className='max-w-[500px] w-full px-3 py-2'
          type='text'
          placeholder='Enter Product Category'
          required
        />
      </div>

      {/* Product Sizes */}
      <div className='w-full'>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['100g', '200g', '250g', '500g'].map((size) => (
            <div
              key={size}
              onClick={() => setSizes((prev) => (prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]))}
            >
              <p className={`${sizes.includes(size) ? 'bg-green-500' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Prices */}
      <div className='w-full'>
        <p className='mb-2'>Product Price</p>
        {sizes.map((size, index) => (
          <div key={index} className='flex gap-3'>
            <input
              type='number'
              placeholder={`Price for ${size}`}
              value={prices[index] || ''}
              onChange={(e) => {
                const newPrices = [...prices];
                newPrices[index] = parseFloat(e.target.value) || 0;
                setPrices(newPrices);
              }}
            />
          </div>
        ))}
      </div>

      {/* Old Prices / Discounts */}
      <div className='w-full'>
        <p className='mb-2'>Product Old Price or Discount</p>
        {sizes.map((size, index) => (
          <div key={index} className='flex gap-3'>
            <input
              type='number'
              placeholder={`Old Price for ${size}`}
              value={oldPrices[index] || ''}
              onChange={(e) => {
                const newOldPrices = [...oldPrices];
                newOldPrices[index] = parseFloat(e.target.value) || 0;
                setOldPrices(newOldPrices);
              }}
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button className='bg-black text-white px-3 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700'>
        Update Product
      </button>
    </form>
  );
};

export default Edit;