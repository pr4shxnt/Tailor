import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const WLContext = createContext();

const WishListProvider = ({ children }) => {
    const [isWishListed, setIsWishListed] = useState(false);
    const [wishList, setWishList] = useState([]);

    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const userId = parsedUser ? parsedUser.id : null;

    const getWishList = async () => {
        if (!userId) return;
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wishlist/${userId}`);
            setWishList(response.data.items || []);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    useEffect(() => {
        getWishList();
    }, [userId]);



    const checkProductWishList = async (productId) => {
        if (!userId) return false; // Ensure user is logged in
    
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wishlist/check/${userId}/${productId}`);
            return response.data.exists; // Returns true or false
        } catch (error) {
            console.error("Error checking wishlist:", error);
            return false;
        }
    };
    
    return (
        <WLContext.Provider value={{ wishList, setWishList, isWishListed, setIsWishListed, getWishList, checkProductWishList }}>
            {children}
        </WLContext.Provider>
    );
};

export default WishListProvider;
