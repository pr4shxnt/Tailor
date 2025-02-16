import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import ItemsCounter from '../ProductDetails/ItemsCounter';
import LoginModel from '../Log-in/LoginModel';
import { AuthContext } from '../Log-in/AuthProvider';
import { WLContext } from '../Wishlist/WishlistContext';
import ProductReview from './ProductReview';

function ProductsDetails() {
  const { id } = useParams();
  const { addToWishList, removeFromWishList, getWishList, checkProductWishList } = useContext(WLContext);
  const { isUserAuthenticated, fetchCart } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [isWishListed, setIsWishListed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loginModelShow, setLoginModelShow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const token = sessionStorage.getItem("sessionid");
  const userid = localStorage.getItem("userid");



  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    if (id) fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      (async () => {
        const exists = await checkProductWishList(product._id);
        setIsWishListed(exists);
      })();
    }
  }, [product]);

  if (!product) return <div>Loading...</div>;


  const handleAddWishlist = async () => {
    if (!isUserAuthenticated && !token) {
      setLoginModelShow(true);
      return;
    }
    try {
      if (isWishListed) {
        await removeFromWishList(product._id);
      } else {
        await addToWishList(product._id);
      }
      setIsWishListed(!isWishListed);
      getWishList();
    } catch (error) {
      console.error("Wishlist operation failed:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!isUserAuthenticated && !token) {
      setLoginModelShow(true);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        { productId: product._id, quantity, userId: userid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart()
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };


  const images = product?.images?.map((image) => `${import.meta.env.VITE_IMAGES}/${image}`) || [];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);


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
                <Heart className={`duration-700 ${isWishListed ? "text-red-500 scale-105" : "text-black hover:text-red-500"} `} fill={isWishListed ? "currentColor " : "none"} size={28} />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" fill={i < product.avgRating ? 'currentColor' : 'none'} />
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
            <button onClick={handleAddToCart} className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            <div className="mt-8 border-t border-gray-200 pt-8 text-gray-500">{product.description}</div>
            
            {/* Shipping & Returns */}
            <div className="mt-8 flex gap-4">
              <div className="flex items-center gap-2"><Truck className="w-5 h-5 text-gray-400" /><span className="text-sm">Free shipping</span></div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-gray-400" /><span className="text-sm">30-day returns</span></div>
            </div>
          </div>

          
        </div>
        <ProductReview productId={product._id} token={token}/>
      </div>
      {loginModelShow && <LoginModel setLoginModel={setLoginModelShow} />}
    </div>
  );
}

export default ProductsDetails;
