import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams()
  const {products, currency} = useContext(ShopContext);
  const [productdata, setProductdata] = useState(false);
  const [image, setImage] = useState("");



  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductdata(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProduct();
  }, [productId, products])

  
  return productdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product image*/}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            { productdata.image.map((item, index) => (
               <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
             ))}
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* Product details */}
             <div className='flex-1'>
              <h1 className='text-2xl font-medium mt-2 text-black'>{productdata.name}</h1>
              <div className='flex items-center gap-1 my-2'>
                <img src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000" alt="" className="w-3 5" />
                <img src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000" alt="" className="w-3 5" />
                <img src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000" alt="" className="w-3 5" />
                <img src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000" alt="" className="w-3 5" />
                <img src="https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000" alt="" className="w-3 5" />
                <p className='text-gray-500 p1-2'>(5)</p>
              </div>
              <p className='line-through text-gray-500 mt-5  font-medium '>{productdata.oldPrice ? currency : " "}:{productdata.oldPrice || " " } </p>
              <p className='text-black mt-5 text-3xl font-medium'>{currency}:{productdata.price}</p>
                {/*<p className='text-red-500 mt-5 text-3xl font-medium '>{productdata.discount}%10</p>*/}
                <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
              
             </div>
      </div>
    </div>
  ): <div className="text-center text-2xl font-bold text-gray-600 animate-pulse " >Loading</div>
}

export default Product
