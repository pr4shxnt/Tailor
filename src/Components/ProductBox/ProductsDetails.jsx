import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, ArrowRight } from 'lucide-react';

function ProductsDetails() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1618354691438-25bc04584c23?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&q=80&w=800'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="relative">
            <div className="relative w-full h-72 sm:h-96 rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt="Product"
                className="w-full h-full object-cover object-center"
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
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Premium Cotton T-Shirt</h1>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400" fill={i < 4 ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">(128 reviews)</p>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-3xl tracking-tight text-gray-900">$49.00</p>
              <p className="mt-1 text-sm text-gray-500">Free shipping on orders over $100</p>
            </div>

            {/* Size selector */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-8">
              <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="prose prose-sm text-gray-500">
                <p>
                  This premium cotton t-shirt combines style with comfort. Made from 100% organic cotton,
                  it features a modern fit and superior durability. Perfect for everyday wear or casual outings.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-gray-900">• 100% Organic Cotton</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-900">• Pre-shrunk fabric</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gray-900">• Machine washable</span>
                  </li>
                </ul>
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
    </div>
  );
}

export default ProductsDetails;