import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Cards from "../Cards/Cards";
import CardsNew from "../Cards/CardsNew";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const sectionRef = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false); // Tracks if seen once

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true); // Set true permanently when seen
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasBeenVisible]); // Dependency ensures effect runs only if `hasBeenVisible` changes

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/featured`);
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="py-10 w-[85%] container pt-16 flex flex-col">
      <div>
        {/* Heading */}
        <h1
          className={`text-2xl md:text-4xl uppercase tracking-wider font-bold opacity-0 ${
            hasBeenVisible ? "animate-fade-left-right" : ""
          }`}
        >
          <div className="flex gap-3">
            Featured <span className="text-purple-500">Products.</span>
          </div>
          <p className="text-[10px] md:text-[13px] leading-4 font-light">
            Enjoy Shopping and subscribe for free coupons.
          </p>
        </h1>

        {/* Featured Product Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8"
        >
          {featuredProducts.length > 0 ? (
            featuredProducts.map((products, index) => (
              <div
                key={products._id}
                className={`bg-primary text-tertiary rounded-[3px] shadow-lg text-center opacity-0 ${
                  hasBeenVisible ? `animate-fade-in-up animation-delay-${index * 200}` : ""
                }`}
              >
                <CardsNew product={products.product} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No featured products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
