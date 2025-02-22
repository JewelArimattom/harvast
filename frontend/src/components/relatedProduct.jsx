import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import ProductItem from './Productitem';
import Title from './Title';

const RelatedProduct = ({category}) => {
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);  

    const reloadpage = () => {
        window.location.reload();
    }

    useEffect(() => {
        if(products.length > 0) {
            let productsCopy = products;
            productsCopy = productsCopy.filter((item) => category === item.category);
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products])
  return (
    <div className='my-24' >
        <div className='text-center py-2 text-3xl'>
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
      <div onClick={reloadpage} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {
         relatedProducts.map((item, index)=>(
          
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
         ))
        }
      </div>
    </div>
  )
}

export default RelatedProduct
