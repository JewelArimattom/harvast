import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext); 

    // 🔍 Find the lowest price for display
    const minPrice = price ? Math.min(...Object.values(price)) : 0;

    return (
        <Link className='text-black cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out duration-300' src={image[0]} alt={name} />
            </div>
            <div>
                <p className='font-semibold pt-2 py-1 flex justify-center'>{name}</p>
            </div>
            <div>
                <p className='flex justify-center'>{currency}{minPrice.toFixed(2)}</p>
            </div>
        </Link>
    );
}

export default ProductItem;
