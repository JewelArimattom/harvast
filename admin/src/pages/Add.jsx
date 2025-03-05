import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Spices');
  const [sizes, setSizes] = useState([]); // Array to store sizes
  const [newSize, setNewSize] = useState(''); // Input for new size
  const [prices, setPrices] = useState([]); // Prices for each size
  const [oldPrices, setOldPrices] = useState([]); // Old prices for each size

  // Add a new size to the sizes array
  const addSize = () => {
    if (newSize.trim() !== '' && !sizes.includes(newSize.trim())) {
      setSizes([...sizes, newSize.trim()]);
      setPrices([...prices, 0]); // Initialize price for the new size
      setOldPrices([...oldPrices, 0]); // Initialize old price for the new size
      setNewSize(''); // Clear the input field
    }
  };

  // Remove a size from the sizes array
  const removeSize = (size) => {
    const index = sizes.indexOf(size);
    if (index !== -1) {
      setSizes(sizes.filter((_, i) => i !== index));
      setPrices(prices.filter((_, i) => i !== index));
      setOldPrices(oldPrices.filter((_, i) => i !== index));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('price', JSON.stringify(prices));
      formData.append('oldPrice', JSON.stringify(oldPrices));

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Product added successfully");
        setName('');
        setDescription('');
        setCategory('Spices');
        setSizes([]);
        setPrices([]);
        setOldPrices([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 p-4 sm:p-8'>
      {/* Image Upload */}
      <div className='w-full'>
        <p className='text-2xl mb-2'>Upload Image</p>
        <div className='flex flex-wrap gap-2'>
          {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
            <label key={index} htmlFor={`image${index + 1}`} className='cursor-pointer'>
              <img
                className='w-20 h-20 object-cover rounded border border-gray-300'
                src={
                  [image1, image2, image3, image4][index]
                    ? URL.createObjectURL([image1, image2, image3, image4][index])
                    : "https://cdn0.iconfinder.com/data/icons/upload-download-9/24/drag_upload_upload_download_regular_f-1024.png"
                }
                alt={`Upload ${index + 1}`}
              />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id={`image${index + 1}`} hidden />
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
          className='w-full px-3 py-2 border rounded'
          type="text"
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
          className='w-full px-3 py-2 border rounded'
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
          className='w-full px-3 py-2 border rounded'
          type="text"
          placeholder='Enter Product Category'
          required
        />
      </div>

      {/* Product Sizes */}
      <div className='w-full'>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex flex-col sm:flex-row gap-3'>
          {/* Input for adding new sizes */}
          <input
            type="text"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            placeholder="Enter a new size (e.g., 100g)"
            className='w-full sm:w-auto px-3 py-2 border rounded'
          />
          <button
            type="button"
            onClick={addSize}
            className='w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Add Size
          </button>
        </div>
        {/* Display added sizes */}
        <div className='flex flex-wrap gap-3 mt-3'>
          {sizes.map((size, index) => (
            <div key={index} className='flex items-center gap-2 bg-gray-200 px-3 py-1 rounded'>
              <p>{size}</p>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className='text-red-500 hover:text-red-700'
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Prices */}
      <div className='w-full'>
        <p className='mb-2'>Product Price</p>
        {sizes.map((size, index) => (
          <div key={index} className='flex flex-col sm:flex-row gap-3 mb-2'>
            <p className='w-full sm:w-20'>{size}:</p>
            <input
              type="number"
              placeholder={`Price for ${size}`}
              value={prices[index] || ""}
              onChange={(e) => {
                let newPrices = [...prices];
                newPrices[index] = parseFloat(e.target.value) || 0;
                setPrices(newPrices);
              }}
              className='w-full px-3 py-2 border rounded'
            />
          </div>
        ))}
      </div>

      {/* Old Prices / Discounts */}
      <div className='w-full'>
        <p className='mb-2'>Product Old Price or Discount</p>
        {sizes.map((size, index) => (
          <div key={index} className='flex flex-col sm:flex-row gap-3 mb-2'>
            <p className='w-full sm:w-20'>{size}:</p>
            <input
              type="number"
              placeholder={`Old Price for ${size}`}
              value={oldPrices[index] || ""}
              onChange={(e) => {
                let newOldPrices = [...oldPrices];
                newOldPrices[index] = parseFloat(e.target.value) || 0;
                setOldPrices(newOldPrices);
              }}
              className='w-full px-3 py-2 border rounded'
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button className='w-full sm:w-auto bg-black text-white px-3 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-gray-700'>
        Add Product
      </button>
    </form>
  );
};

export default Add;