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



    const handleAddWishlist = async () => {
        try {
          const token = sessionStorage.getItem("sessionid"); 
          if (!isUserAuthenticated && !token) {
            setLoginModelShow(true);
            return;
          }
    
          
          const exists = await checkProductWishList(props.product._id);
          if (exists) {
            setIsWishListed(true); // If already in wishlist, mark as wished
            await removeFromWishList(); 
          } else {
            setIsWishListed(false); // If not in wishlist, mark as not wished
            await addToWishList(); 
          }
    
        
          getWishList();  // Re-fetch the updated wishlist
        } catch (error) {
          console.error("Wishlist operation failed:", error.response?.data?.message || error.message);
          alert("Failed to update wishlist.");
        }
      };
    
      // Function to remove from wishlist
      const removeFromWishList = async () => {
        try {
          const token = sessionStorage.getItem("sessionid");
          const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/wishlist/remove`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                userId: userid,
                productId: props.product._id,
              },
            }
          );
    
          console.log("Removed from wishlist:", response.data);
          setWishList(wishList.filter(item => item.productId !== props.product._id)); // Update local wishlist state
        } catch (error) {
          console.error("Error removing from wishlist:", error.message);
        }
      };
    
      // Function to add to wishlist
      const addToWishList = async () => {
        try {
          const token = sessionStorage.getItem("sessionid");
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/wishlist/add`,
            {
              userId: userid,
              productId: props.product._id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          console.log("Added to wishlist:", response.data);
          setWishList([...wishList, { productId: props.product._id }]); // Update local wishlist state
          
        } catch (error) {
          console.error("Error adding to wishlist:", error.message);
        }
      };
    
    return (
        <WLContext.Provider value={{ wishList, setWishList, isWishListed, setIsWishListed, getWishList, checkProductWishList }}>
            {children}
        </WLContext.Provider>
    );
};

export default WishListProvider;
