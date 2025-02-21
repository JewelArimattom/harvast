import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [oldPrice,setOldPrice] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('Spices');
  const [sizes,setSizes] = useState([]);
  

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      formData.append('name', name);
      formData.append('price', price);
      formData.append('oldPrice', oldPrice);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('sizes', JSON.stringify(sizes));

      const response = await axios.post(backendUrl + '/api/product/add', formData,{headers :{token}});
      if (response.data.success) {
        toast.success("Product added successfully");
        setName('');
        setPrice('');
        setOldPrice('');
        setDescription('');
        setCategory('Spices');
        setSizes([]);
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');
      }
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='text-2xl mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          <label  htmlFor="image1">
            <img className='w-15 h-15 hover:cursor-pointer pt-2' src={!image1 ? "https://cdn0.iconfinder.com/data/icons/upload-download-9/24/drag_upload_upload_download_regular_f-1024.png" : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label  htmlFor="image2">
            <img className='w-15 h-15 hover:cursor-pointer pt-2' src={!image2 ? "https://cdn0.iconfinder.com/data/icons/upload-download-9/24/drag_upload_upload_download_regular_f-1024.png" : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label  htmlFor="image3">
            <img className='w-15 h-15 hover:cursor-pointer pt-2' src={ !image3 ? "https://cdn0.iconfinder.com/data/icons/upload-download-9/24/drag_upload_upload_download_regular_f-1024.png" : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label  htmlFor="image4">
            <img className='w-15 h-15 hover:cursor-pointer pt-2' src={ !image4 ? "https://cdn0.iconfinder.com/data/icons/upload-download-9/24/drag_upload_upload_download_regular_f-1024.png" : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
       

        </div>
      </div>

    <div className='w-full'>
      <p className='mb-2'>Product Name</p>
      <input onChange={(e) => setName(e.target.value)} value={name} className='max-w-[500px] w-full px-3 py-2 ' type="text" placeholder='Enter Product Name' required />
    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Description</p>
      <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='max-w-[500px] w-full px-3 py-2 ' type="text" placeholder='Enter Product Description' required />
    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Price</p>
      <input onChange={(e) => setPrice(e.target.value)} value={price} className='max-w-[500px] w-full px-3 py-2 ' type="number" placeholder='Enter Product Price' required />
    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Old Price or Discount</p>
      <input onChange={(e) => setOldPrice(e.target.value)} value={oldPrice} className='max-w-[500px] w-full px-3 py-2 ' type="number" placeholder='Enter Product Old Price or Discount' required />
    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Category</p>
      <input onChange={(e) => setCategory(e.target.value)} value={category} className='max-w-[500px] w-full px-3 py-2 ' type="text" placeholder='Enter Product Category' required />
    </div>

    <div className='w-full'>
      <p className='mb-2'>Product Sizes</p>
      <div className='flex gap-3'>
        <div onClick={() => setSizes(prev =>prev.includes("100g") ? prev.filter(item => item !== "100g") : [...prev, "100g"]) }>
          <p className={`${sizes.includes("100g") ? "bg-green-500" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>100g</p>
        </div>
        <div onClick={() => setSizes(prev =>prev.includes("200g") ? prev.filter(item => item !== "200g") : [...prev, "200g"]) }>
          <p className={`${sizes.includes("200g") ? "bg-green-500" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>200g</p>
        </div>
        <div onClick={() => setSizes(prev =>prev.includes("250g") ? prev.filter(item => item !== "250g") : [...prev, "250g"]) }>
          <p className={`${sizes.includes("250g") ? "bg-green-500" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>250g</p>
        </div>
        <div onClick={() => setSizes(prev =>prev.includes("500g") ? prev.filter(item => item !== "500g") : [...prev, "500g"]) }>
          <p className={`${sizes.includes("500g") ? "bg-green-500" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>500g</p>
        </div>
      </div>
    </div>
    
    <button className='bg-black text-white px-3 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm effects hover:bg-gray-700 '>Add Product</button>
    </form>
  )
}

export default Add
