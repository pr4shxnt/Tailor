import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import ItemsCounter from "../ProductDetails/ItemsCounter";
import LoginModel from "../Log-in/LoginModel";
import { AuthContext } from "../Log-in/AuthProvider";
import { WLContext } from "../Wishlist/WishlistContext";
import ProductReview from "./ProductReview";

const ProductDetails = () => {
  const { id } = useParams();
  const { isUserAuthenticated, fetchCart } = useContext(AuthContext);
  const { checkProductWishList, getWishList } = useContext(WLContext);
  const [product, setProduct] = useState(null);
  const [isWishListed, setIsWishListed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loginModelShow, setLoginModelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const token = sessionStorage.getItem("sessionid");
  const user = localStorage.getItem("user");

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  // Check if product is in wishlist when product loads
  useEffect(() => {
    const checkWishlistStatus = async () => {
      const exists = await checkProductWishList(product._id);
      setIsWishListed(exists);
    };
    if (product) checkWishlistStatus();
  }, [product, checkProductWishList]);

  // Helper: Ensure user is authenticated (show login modal if not)
  const ensureAuthenticated = () => {
    if (!isUserAuthenticated && !token) {
      setLoginModelShow(true);
      return false;
    }
    return true;
  };

  // Handle Add to Cart (mirroring Cards logic)
  const handleAddToCart = async () => {
    if (!ensureAuthenticated()) return;
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        { productId: product._id, quantity, userId: user },
        config
      );
      console.log("Item added to cart:", response.data);
      fetchCart();
      alert("Item added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error.response?.data?.message || error.message);
      alert("Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  // Remove from wishlist (no parameter; uses product._id)
  const removeFromWishList = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId: user,
          productId: product._id,
        },
      };
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/wishlist/remove`, config);
      console.log("Removed from wishlist:", response.data);
      setIsWishListed(false);
    } catch (error) {
      console.error("Error removing from wishlist:", error.response?.data?.message || error.message);
    }
  };

  // Add to wishlist (no parameter; uses product._id)
  const addToWishList = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/add`,
        { userId: user, productId: product._id },
        config
      );
      console.log("Added to wishlist:", response.data);
      setIsWishListed(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error.response?.data?.message || error.message);
    }
  };

  // Handle Wishlist Toggle (mirroring Cards logic)
  const handleAddWishlist = async () => {
    if (!ensureAuthenticated()) return;
    try {
      const exists = await checkProductWishList(product._id);
      if (exists) {
        await removeFromWishList();
      } else {
        await addToWishList();
      }
      getWishList();
    } catch (error) {
      console.error("Wishlist operation failed:", error.response?.data?.message || error.message);
      alert("Failed to update wishlist.");
    }
  };

  // Image gallery navigation
  const images = product?.images?.map((img) => `${import.meta.env.VITE_IMAGES}/${img}`) || [];
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen pt-16 text-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image Gallery */}
          <div className="relative h-[500px]">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <img src={images[currentImageIndex]} alt="Product" className="w-full h-full object-contain" />
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <button onClick={handleAddWishlist} title={isWishListed ? "Remove from Wishlist" : "Add to Wishlist"}>
                <Heart
                  className={`duration-700 ${isWishListed ? "text-red-500 scale-105" : "text-black hover:text-red-500"}`}
                  fill={isWishListed ? "currentColor" : "none"}
                  size={28}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" fill={i < product.avgRating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">({product.avgRating} reviews)</p>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
              <p className="mt-1 text-sm text-gray-500">Free shipping on orders over $100</p>
            </div>

            {/* Quantity & Size */}
            <div className="flex items-center h-28 gap-4">
              <ItemsCounter quantity={quantity} setQuantity={setQuantity} />
              <div className="flex items-center mt-5 text-2xl">
                <h3 className="font-medium text-gray-900">Size:&nbsp;</h3>
                <div>{product.size}</div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <ShoppingCart className="w-5 h-5" />
              {loading ? "Adding..." : "Add to Cart"}
            </button>

            <div className="mt-8 border-t border-gray-200 pt-8 text-gray-500">{product.description}</div>

            {/* Shipping & Returns */}
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm">30-day returns</span>
              </div>
            </div>
          </div>
        </div>
        <ProductReview productId={product._id} token={token} setLoginModelShow={setLoginModelShow} isUserAuthenticated={isUserAuthenticated} />
      </div>
      {loginModelShow && <LoginModel setLoginModel={setLoginModelShow} LoginModel={loginModelShow} />}
    </div>
  );
};

export default ProductDetails;
