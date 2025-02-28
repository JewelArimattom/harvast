import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = () => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/list', { headers: { token: localStorage.getItem('token') } })

      if (res.data.success) {
        setList(res.data.products)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token: localStorage.getItem('token') } })
      if (res.data.success) {
        toast.success("Product removed successfully")
        await fetchList()
      } else {
        toast.error("Product not removed")
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='text-2xl font-semibold mb-2'>All Products</p>
      <div className='flex flex-col gap-2 '>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-200 border border-gray-300'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* list */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm' key={index}>
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              {/* Handle Multiple Prices */}
              <p>
                {Array.isArray(item.price) 
                  ? item.price.map((p, i) => (
                      <span key={i}>
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(p)}
                        {i !== item.price.length - 1 && ", "}
                      </span>
                    ))
                  : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}
              </p>
              <p onClick={() => handleDelete(item._id)} className='text-right md:text-center cursor-pointer hover:text-red-500 text-lg'>x</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
