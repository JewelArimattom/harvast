import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext();


const ShopContextProvider = (props) => {
    const currency = "Rs ";
    const deliveryFee = 100;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");



    const addToCart = async (itemId,size) => {
            if(!size){
                toast.error("Please select a Quantity",{autoClose:1000});
                return;
            }

            toast.success("Item added to cart",{autoClose:1000});
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {

            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        } 
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers : {token}});
            } catch (error) {
               console.log(error);
               toast.error(error.message);
            }
        }
        

    };
    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity},{headers : {token}});
            } catch (error) {
               console.log(error);
               toast.error(error.message);
            }
        }
    }
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])

    const getCartAmount =  () => {
        let totalAmound = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                if(cartItems[items][item]>0){
                    let productData = products.find((product) => product._id === items);
                    totalAmound += (productData.price * cartItems[items][item]);
                    
                }
            }
        }
        return totalAmound;
    }

    const getProducts = async () => {
        try {
            const res = await axios.get(backendUrl +'/api/product/list');
            if (res.data.success) {
                setProducts(res.data.products);
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserCart = async (token) => {
        try {
            const res = await axios.post(backendUrl + '/api/cart/get',{},{headers : {token}});
            if (res.data.success) {
                setCartItems(res.data.cartData);
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        if (!token&& localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    }, []);
    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}

        </ShopContext.Provider>
    )
};

export default ShopContextProvider;