import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBasketIcon } from "lucide-react";
import LoginModel from "../Log-in/LoginModel";
import { AuthContext } from "../Log-in/AuthProvider";
import axios from "axios"; // Import axios

const Cards = (props) => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const [loginModelShow, setLoginModelShow] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false); // Track wishlist state
  const [loading, setLoading] = useState(false); // Track loading state
  const user = localStorage.getItem("user"); // Get userid from localStorage
  const gradient = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)";

  const cardStyle = {
    backgroundImage: `${gradient}, url(${import.meta.env.VITE_IMAGES}/${props.product.images[0]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const parsedUser = JSON.parse(user)
  console.log(parsedUser);
  
  const userid = parsedUser.id

  const sessionid = sessionStorage.getItem("sessionid");

  // Axios request for adding to cart
  const handleAddToCart = async () => {
    try {
      const token = sessionStorage.getItem("sessionid"); // Get the token from session storage
      if (!isUserAuthenticated && !token) {
        setLoginModelShow(true);
        return; // Early exit if not authenticated and no session token
      }

      // Prepare the request headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to Authorization header
        },
      };

      // Make the request with the token in the header
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
      const token = sessionStorage.getItem("sessionid"); // Get the token from session storage
      if (!isUserAuthenticated && !token) {
        setLoginModelShow(true);
        return; // Early exit if not authenticated and no session token
      }

      // Prepare the request headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to Authorization header
        },
      };

      // Make the request with the token in the header
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/add`,
        { productId: props.product._id, userId: userid },
        config
      );

      setIsWishlist(true); // Toggle wishlist state
      alert(isWishlist ? "Removed from wishlist" : "Added to wishlist");
    } catch (error) {
      console.error("Wishlist operation failed:", error.response?.data?.message || error.message);
      alert("Failed to update wishlist.");
    }
  };


  console.log(props.product._id);
  console.log(userid);
  
  
  return (
    <div className="flex flex-col w-full items-center gap-2">
      <div
        style={cardStyle}
        className="group relative w-full h-80 rounded-lg flex flex-col justify-end items-start overflow-hidden cursor-pointer"
      >
        {/* Text Section */}
        <div className="absolute text-center justify-center w-full z-10 bottom-4 left-0 flex flex-col gap-1 transition-all duration-300 ">
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
            title={`${isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}`}
          >
            <Heart
              className={`${isWishlist ? "text-red-500 scale-105" : "text-white hover:text-red-500 duration-"} duration-700`}
              fill={isWishlist ? "currentColor" : "none"} // Fill when active
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
