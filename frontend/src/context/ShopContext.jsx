import { createContext } from "react";
import {products} from "../assets/assets"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "USD";
    const deliveryFee = 0; 
    const value = {
        products
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}

        </ShopContext.Provider>
    )
};

export default ShopContextProvider;