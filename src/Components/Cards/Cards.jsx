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
          <div className="flex items-center justify-center md:hidden backdrop-blur-sm mx-2 -mb-2 p-1 gap-1.5 rounded-lg">
          <button
            className=""
            onClick={() => alert(`Add ${props.product.name} to Cart`)}
          >
            <ShoppingBasketIcon color="gray" size={20}/>            </button>

            <Link className="" to={`/product/${props.id}`}>

            <button className=" p-1 border-b text-white text-xs">
              details

          </button>     </Link>
          <button
            className="flex items-center justify-center text-white"
            onClick={() => setIsWishlist(!isWishlist)}
          >
            <Heart
              className={`${isWishlist ? "text-red-500" : "text-white"}`}
              fill={isWishlist ? "currentColor" : "none"} // Fill when active
              size={20}
            />

          </button>
          </div>
        </div>

        {/* Red Layer */}
        <div
          className="absolute md:flex hidden bottom-[-100%] left-0 w-full h-full backdrop-blur-sm bg-black bg-opacity-30 rounded-lg justify-center items-center gap-4 transition-all duration-300 group-hover:bottom-0"
        >
          {/* Buy Button */}
          <Link>
          <button
            className="text-white hover:text-gray-400 duration-500"
            title="add to cart?"
            onClick={() => alert(`Add ${props.product.name} to Cart`)}
          >
            <ShoppingBasketIcon   size={28}/>            </button>
          </Link>

          {/* Add to Cart Button */}
          <Link className="" to={`/product/${props.id}`}>

<button title="Visit the product page" className=" px-5 py-1.5 border rounded-3xl hover:bg-white hover:text-gray-600 duration-500 text-white font-light text-lg">
  Visit

</button>     </Link>

          {/* Wishlist Button */}
          <button
            className="flex items-center justify-center text-white"
            onClick={() => setIsWishlist(!isWishlist)}
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
    </div>
  );
};

export default Cards;
