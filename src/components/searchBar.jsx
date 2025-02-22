import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (location.pathname.includes("collection") ) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [location]);

  return showSearch&&visible ? (
    <div className=' flex items-center justify-center  bg-gray-200 '>
      <div className='inline-flex items-center justify-center border border-black px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2  '>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm'/>
        <image className='w-4 ' src="https://img.icons8.com/?size=100&id=132&format=png&color=000000" alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} className='w-4 inline cursor-pointer' src="https://img.icons8.com/?size=100&id=16248&format=png&color=000000" alt="" />
    </div>
  ) :null
}

export default SearchBar
