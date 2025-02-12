import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBasketIcon } from "lucide-react";
import LoginModel from "../Log-in/LoginModel";
import { AuthContext } from "../Log-in/AuthProvider";
import { WLContext } from "../Wishlist/WishlistContext"; // Import WLContext
import axios from "axios"; // Import axios

const Cards = (props) => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const { checkProductWishList, getWishList, setWishList, wishList } = useContext(WLContext); // Destructure from WLContext
  const [loginModelShow, setLoginModelShow] = useState(false);
  const [isWishListed, setIsWishListed] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const user = localStorage.getItem("user"); // Get user id from localStorage
  const gradient = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)";

  const cardStyle = {
    backgroundImage: `${gradient}, url(${import.meta.env.VITE_IMAGES}/${props.product.images[0]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const parsedUser = JSON.parse(user);
  const userid = parsedUser ? parsedUser.id : null;

  const sessionid = sessionStorage.getItem("sessionid");

  // Axios request for adding to cart
  const handleAddToCart = async () => {
    try {
      const token = sessionStorage.getItem("sessionid");
      if (!isUserAuthenticated && !token) {
        setLoginModelShow(true);
        return; // Early exit if not authenticated and no session token
      }

      // Prepare the request headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        { productId: props.product._id, quantity: 1, userId: userid },
        config
      );

      console.log("Item added to cart:", response.data);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error.response?.data?.message || error.message);
      alert("Failed to add to cart.");
    }
  };

  // Axios request for adding/removing from wishlist
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

  // Check if product is in wishlist when the component mounts
  useEffect(() => {
    const checkWishlistStatus = async () => {
      const exists = await checkProductWishList(props.product._id);
      setIsWishListed(exists); // Update wishlist status on mount
    };

    if (userid) checkWishlistStatus();
  }, [userid, props.product._id, checkProductWishList]);

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <div
        style={cardStyle}
        className="group relative w-full h-80 rounded-lg flex flex-col justify-end items-start overflow-hidden cursor-pointer"
      >
        {/* Text Section */}
        <div className="absolute text-center justify-center w-full z-10 bottom-4 left-0 flex flex-col gap-1 transition-all duration-300">
          <h1 className="text-lg md:text-lg text-white font-bold hover:text-gray-200">
            {props.product.name}
          </h1>
          <p className="text-xs text-white">
            {props.product.fabric}, ${props.product.price}
          </p>
        </div>

        {/* Red Layer */}
        <div className="absolute flex bottom-[-100%] left-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-30 rounded-lg justify-center items-center gap-2 md:gap-4 transition-all duration-300 group-hover:bottom-0">
          {/* Add to Cart Button */}
          <button
            className="text-white hover:text-gray-400 duration-500"
            title="Add to cart"
            onClick={handleAddToCart}
            disabled={loading} // Disable button while loading
          >
            <ShoppingBasketIcon size={28} />
          </button>

          {/* Visit Product Button */}
          <Link to={`/product/${props.product._id}`}>
            <button
              title="Visit the product page"
              className=" px-5 py-1.5 border rounded-3xl hover:bg-white hover:text-gray-600 duration-500 text-white font-light text-lg"
            >
              Visit
            </button>
          </Link>

          {/* Wishlist Button */}
          <button
            className="flex items-center justify-center text-white"
            onClick={handleAddWishlist}
            title={`${isWishListed ? "Remove from Wishlist" : "Add to Wishlist"}`}
          >
            <Heart
              className={`${isWishListed ? "text-red-500 scale-105" : "text-white hover:text-red-500 duration-"} duration-700`}
              fill={isWishListed ? "currentColor" : "none"} // Fill when active
              size={28}
            />
          </button>
        </div>
      </div>

      {/* Login Model */}
      {loginModelShow && <LoginModel setLoginModel={setLoginModelShow} LoginModel={loginModelShow} />}
    </div>
  );
};

export default Cards;
