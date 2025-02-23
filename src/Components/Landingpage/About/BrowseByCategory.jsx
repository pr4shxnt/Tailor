import React, { useState, useEffect, useRef } from "react";

const categories = [
  { id: 1, name: "Electronics", img: "https://via.placeholder.com/150" },
  { id: 2, name: "Clothing", img: "https://via.placeholder.com/150" },
  { id: 3, name: "Home & Kitchen", img: "https://via.placeholder.com/150" },
  { id: 4, name: "Beauty & Health", img: "https://via.placeholder.com/150" },
];

const BrowseByCategory = () => {
  const sectionRef = useRef(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasBeenVisible]);

  return (
    <div ref={sectionRef} className="py-10 container w-[85%] pt-16 flex flex-col ">
      {/* Section Heading */}
      <h1 className={`text-4xl uppercase tracking-wider font-bold opacity-0 ${
        hasBeenVisible ? `animate-fade-left-right` : ""
      }`}>
        <div className="flex gap-3">
          Browse by 
          <span className="text-purple-500">Category.</span>
        </div>
        <p className="text-[13px] leading-4 font-light">
          Explore our categories for the best deals.
        </p>
      </h1>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {categories.map((category, index) => (
          <div 
            key={category.id} 
            className={`bg-gray-200 text-gray-800 rounded-[3px] shadow-lg text-center p-4 opacity-0 ${
              hasBeenVisible ? `animate-fade-in-up animation-delay-${index * 300}` : ""
            }`}
          >
            <img src={category.img} alt={category.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="mt-2 text-lg font-semibold">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
