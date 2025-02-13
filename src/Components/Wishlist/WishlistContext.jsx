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

    // ✅ Function to check if a product is in wishlist
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
    // ✅ Function to remove from wishlist
    const removeFromWishList = async (productId) => {
        try {
            const token = sessionStorage.getItem("sessionid");
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/wishlist/remove`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { userId, productId },
                }
            );

            setWishList(wishList.filter(item => item.productId !== productId));
            setIsWishListed(false);
        } catch (error) {
            console.error("Error removing from wishlist:", error.message);
        }
    };

    // ✅ Function to add to wishlist
    const addToWishList = async (productId) => {
        try {
            const token = sessionStorage.getItem("sessionid");
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/wishlist/add`,
                { userId, productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setWishList([...wishList, { productId }]);
            setIsWishListed(true);
        } catch (error) {
            console.error("Error adding to wishlist:", error.message);
        }
    };

    return (
        <WLContext.Provider value={{
            wishList, 
            setWishList, 
            isWishListed, 
            setIsWishListed, 
            getWishList, 
            checkProductWishList, 
            addToWishList, 
            removeFromWishList
        }}>
            {children}
        </WLContext.Provider>
    );
};

export default WishListProvider;
