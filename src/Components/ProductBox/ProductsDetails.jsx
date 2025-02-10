import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import ItemsCounter from '../ProductDetails/ItemsCounter';
import LoginModel from '../Log-in/LoginModel';
import { AuthContext } from '../Log-in/AuthProvider';
import { useContext } from 'react';

function ProductsDetails() {
  const { id } = useParams();
  const { isUserAuthenticated } = useContext(AuthContext); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null); // Product state to hold fetched data
  const [quantity, setQuantity] = useState(1)
  const [loginModelShow, setLoginModelShow] = useState(false)
  const [token, setToken] = useState("")
  const userid = localStorage.getItem("userid")



  const sessionid = sessionStorage.getItem("sessionid");
  // Map image paths to full URLs
  const images = product?.images?.map((image) => `${import.meta.env.VITE_IMAGES}/${image}`) || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Fetch product details based on id
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
        setProduct(response.data); // Store product data
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Show a loading state while the product is being fetched
  }

  console.log(quantity);
  
  const handleAddToCart = async () => {
    try {
        const token = sessionStorage.getItem("sessionid"); // Get the token from session storage
        if (!isUserAuthenticated && !token) {
          setLoginModelShow(true)
        }
  
  
        // Prepare the request headers with the token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,  // Attach token to Authorization header
            },
        };
  
        // Make the request with the token in the header
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
            { productId: product._id, quantity: quantity, userId: userid },
            config
        );
  
        console.log("Item added to cart:", response.data);
    } catch (error) {
        console.error("Failed to add to cart:", error.response?.data?.message || error.message);
    }
  };
  

  console.log(product.name);
  

  return (
    <div className="min-h-screen pt-16 text-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="relative h-[500px]">
            <div className="relative w-full h-full  rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt="Product"
                className="w-full h-full object-contain object-center"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-6 h-6" />
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

            {/* Size selector */}
            

<div className="flex items-center h-28 gap-4">
  <div className="">
    <ItemsCounter quantity={quantity} setQuantity={setQuantity}/>
  </div>
  <div className="flex items-center mt-5 select-none  text-2xl ">
              <h3 className=" font-medium   text-gray-900">Size:&nbsp; </h3>
              <div className="   gap-2">
              {product.size}
              </div>
            </div>
</div>
            {/* Add to cart */}
            <div className="mt-8">
            <div
            className="text-white hover:text-gray-400 duration-500"
            title="Add to cart"
            onClick={handleAddToCart}
            
          >
            <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
          </div>
            </div>

            {/* Features */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="prose prose-sm text-gray-500">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Shipping and returns */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loginModelShow && <LoginModel setLoginModel={setLoginModelShow} LoginModel={loginModelShow} />}
      
    </div>
  );
}

export default ProductsDetails;
