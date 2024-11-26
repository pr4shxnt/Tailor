import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Itemhandler from "../../Data/Itemhandler";
import Itemhandler2 from "../../Data/Itemhandler2";
import Kidssitemhandler from "../../Data/Kidsitemhandler";
import "../../index.css";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleRating = (index) => {
    setRating(index);
  };

  useEffect(() => {
    const allProducts = [...Itemhandler, ...Itemhandler2, ...Kidssitemhandler];
    const foundProduct = allProducts.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [productId]);

  useEffect(() => {
    if (product && product.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover"
          />

          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-4">
            {product.images &&
              product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} - Thumbnail ${index + 1}`}
                  className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${
                    selectedImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-start gap-8">
        <div className="">
        <div className="fgap-2">
          <h1 className="text-4xl font-bold ">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>

          <p className="text-2xl font-semibold">${product.price}</p>

          
                
          
          <button className='bg-black hover:bg-zinc-900 p-3 rounded-xl text-white '>
                <i class="fa-solid fa-cart-shopping">‎ ‎ ‎ </i>  Add to Cart
                </button>
          </div>
          </div>

          <div className="">
          {/* Rating and Feedback */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={index <= rating}
                    onChange={() => handleRating(index)}
                  />
                  <i
                    className={`fa fa-star text-2xl transition-colors duration-200 cursor-pointer ${
                      index <= rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => handleRating(index)}
                  ></i>
                </label>
              ))}
              <span className="ml-2 text-gray-600">({rating} stars)</span>
            </div>

            <div className="mt-2">
              <h3 className="text-lg font-semibold mb-2">
                Leave a Feedback
              </h3>
              <form action="" className="w-full">
                <textarea
                  name="feedback"
                  rows={3}
                  placeholder="Share your thoughts..."
                  className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button className='bg-black hover:bg-zinc-900 p-3 rounded-xl text-white '>
                  Submit Feedback
                </button>
              </form>
            </div>
            </div>
          </div>
          </div>

          
        
      </div>
    </section>
  );
};

export default ProductDetails;
