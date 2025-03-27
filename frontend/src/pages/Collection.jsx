import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductIteam from '../components/Productitem';

const Collection = () => {
  const { products , search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setcatagory] = useState([]);

  const toggleCatagory = (e) => {
    if (category.includes(e.target.value)) {
      
      setcatagory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setcatagory(prev => [...prev, e.target.value]);
    }
  }


 const applayFilter = () => {
  let productsCopy = products.slice();

 if(showSearch && search) {
  productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
 }

  if (category.length > 0) {
    productsCopy = productsCopy.filter(item => category.includes(item.category));
  } 

  setFilterProducts(productsCopy);
}

  useEffect(() => {
    applayFilter();
  }, [category,search,showSearch,products])




  return (
    <div className='flex flex-col sm:flex-row gap-2 sm:gap-10 pt-10 border-t'>
      {/* Filters */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center gap-2 cursor-pointer'>FILTERS
          <img className={`h-4 sm:hidden rotate-270 `} onClick={() => setShowFilter(!showFilter)} src="https://img.icons8.com/?size=100&id=100703&format=png&color=000000" alt="" />
        </p>
        {/*Catagorie Filter */}
        <div className={`border border-gray-400 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Catagories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-600'>
            <p className='flex gap-2'>
              <input className='w-4 h-4' type="checkbox" value={"Spices"} onChange={toggleCatagory} /> Spices
            </p>
            <p className='flex gap-2'>
              <input className='w-4 h-4' type="checkbox" value={"Curry powder"} onChange={toggleCatagory} /> Curry powder

            </p>
            <p className='flex gap-2'>
              <input className='w-4 h-4' type="checkbox" value={"Others"} onChange={toggleCatagory} /> Others
            </p>
          </div>
        </div>

        
      </div>
              {/* ui right */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={"ALL"} text2={"PRODUCTS"}/>
            {/* sort */}
        </div>
        {/* products */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductIteam key={index} id={item._id} image={item.image} name={item.name} price={item.price}  />
        
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
