import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../components/relatedProduct';

const Product = () => {
  const { productId } = useParams()
  const { products, currency } = useContext(ShopContext);
  const [productdata, setProductdata] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");



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
            {productdata.image.map((item, index) => (
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
          <p className='line-through text-gray-500 mt-5  font-medium '>{productdata.oldPrice ? currency : " "}:{productdata.oldPrice || " "} </p>
          <p className='text-black mt-5 text-3xl font-medium'>{currency}:{productdata.price}</p>
          {/*<p className='text-red-500 mt-5 text-3xl font-medium '>{productdata.discount}%10</p>*/}
          <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-3'>
              {
                productdata.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-white hover:bg-gray-200 ${item === size ? "border-black text-red-500 bg-gray" : ""} `}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className='w-full py-3 bg-black text-white font-medium sm:text-lg sm:py-4 active:bg-gray-600'>ADD TO CART</button>
          <hr className='mt-8 sm-w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Products</p>
            <p>Pay on Delivery might be available</p>
            <p>Easy 30 days returns and exchanges</p>
          </div>
        </div>
      </div>

              {/* display related products*/}
      <RelatedProduct category={productdata.category}/>

    </div>
  ) : <div className="text-center text-2xl font-bold text-gray-600 animate-pulse " >Loading</div>
}

export default Product
