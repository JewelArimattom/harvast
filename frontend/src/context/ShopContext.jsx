import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "Rs ";
    const deliveryFee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size", { autoClose: 1000 });
            return;
        }
    
        toast.success("Item added to cart", { autoClose: 1000 });
    
        setCartItems((prevCart) => {
            // Clone previous state correctly
            const newCart = { ...prevCart };
    
            if (!newCart[itemId]) {
                newCart[itemId] = {}; // Initialize item object if it doesn't exist
            }
    
            // Ensure size exists, then increment
            newCart[itemId] = {
                ...newCart[itemId], // Ensure immutability
                [size]: (newCart[itemId][size] || 0) + 1,
            };
    
            return newCart;
        });
    
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error("Failed to add item. Please try again.");
            }
        }
    };
    

    /**  Update item quantity in cart */
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = { ...cartItems };
        cartData[itemId] = { ...cartData[itemId], [size]: quantity };

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error("Failed to update quantity", { autoClose: 1000 });
            }
        }
    };

    /**  Get total items count in cart */
    const getCartCount = () => {
        return Object.values(cartItems).reduce(
            (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
            0
        );
    };

    /**  Get total cart amount */
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            let productData = products.find((p) => p._id === itemId);
            if (!productData) return total; // Skip if product is undefined

            return total + Object.entries(sizes).reduce((sum, [size, qty]) => {
                return sum + (productData.price[size] || 0) * qty;
            }, 0);
        }, 0);
    };

    /**  Fetch all products */
    const getProducts = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/product/list`);
            if (res.data.success) {
                setProducts(res.data.products);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            toast.error("Error fetching products");
        }
    };

    /**  Fetch user's cart data */
    const getUserCart = async (token) => {
        try {
            const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
    
            if (res.data.success) {
                // Ensure `cartData` is an object
                const formattedCart = res.data.cartData || {};  
                setCartItems(formattedCart);
               // console.log("Cart Loaded:", formattedCart);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            toast.error("Failed to load cart.");
        }
    };
    

    /**  Fetch products on mount */
    useEffect(() => {
        getProducts();
    }, []);

    /**  Fetch cart if token exists */
    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);

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
        setCartItems,
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
