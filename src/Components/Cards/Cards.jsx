import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBasketIcon } from "lucide-react";

const Cards = (props) => {
  const [isWishlist, setIsWishlist] = useState(false); // Track wishlist state

  const gradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)';

  const cardStyle = {
    backgroundImage: `${gradient}, url(${props.product.image[0]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <div
        style={cardStyle}
        className="group relative w-full h-80 rounded-lg flex flex-col justify-end items-start  overflow-hidden cursor-pointer"
      >
        {/* Text Section */}
        <div
          className="absolute text-center justify-center w-full z-10 bottom-4 left-0 flex flex-col gap-1 transition-all duration-300 "
        >
          <h1 className="text-xl sm:text-lg text-white font-bold hover:text-gray-200">
            {props.product.name}
          </h1>
          <p className="text-xs text-white">
            {props.product.fabric}, ${props.product.price}
          </p>

          {/* Cart and Wishlist Buttons */}
          <div className="flex items-center justify-center md:hidden backdrop-blur-md mx-2 -mb-2 p-1 gap-1.5 rounded-lg">
          <button
            className=""
            onClick={() => alert(`Add ${props.product.name} to Cart`)}
          >
            <ShoppingBasketIcon color="gray" size={30}/>            </button>

            <Link className="" to={`/product/${props.id}`}>

            <button className="bg-gray-800 hover:bg-black px-3 py-2 rounded-xl text-white w-">
              Details

          </button>     </Link>
          <button
            className="flex items-center justify-center text-white"
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart
              className={`{isWishlist ? "text-red-500" : "text-white"}`}
              fill={isWishlist ? "currentColor" : "none"} // Fill when active
              size={30}
            />

          </button>
          </div>
        </div>

        {/* Red Layer */}
        <div
          className="absolute md:flex hidden bottom-[-100%] left-0 w-full h-full bg-transparent backdrop-blur-2xl rounded-lg  flex-col justify-center items-center gap-4 transition-all duration-300 group-hover:bottom-0"
        >
          {/* Buy Button */}
          <Link className="w-3/4" to={`/product/${props.id}`}>
            <button className="bg-gray-800 hover:bg-black p-2 rounded-xl text-white w-full">
              Details
            </button>
          </Link>

          {/* Add to Cart Button */}
          <button
            className="bg-blue-800 hover:bg-blue-900 p-2 rounded-xl text-white w-3/4"
            onClick={() => alert(`Add ${props.product.name} to Cart`)}
          >
            <div className="flex gap-2 items-center justify-center"><ShoppingBasketIcon size={30}/> Add to Cart</div>

          </button>

          {/* Wishlist Button */}
          <button
            className="flex items-center justify-center w-3/4 bg-gray-800 hover:bg-black p-2 rounded-xl text-white"
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart
              className={isWishlist ? "text-red-500" : "text-white"}
              fill={isWishlist ? "currentColor" : "none"} // Fill when active
              size={20}
            />
            <span className="ml-2">{isWishlist ? "Wishlisted" : "Add to Wishlist"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cards;
