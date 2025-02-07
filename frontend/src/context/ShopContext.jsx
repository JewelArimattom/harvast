import { createContext, useEffect, useState } from "react";
import {products} from "../assets/assets"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "Rs ";
    const deliveryFee = 100; 
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();



    const addToCart = async (itemId,size) => {
            if(!size){
                toast.error("Please select a size",{autoClose:1000});
                return;
            }
        else{
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
        }
    };
    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);
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
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}

        </ShopContext.Provider>
    )
};

export default ShopContextProvider;