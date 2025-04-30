import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { id: 1, link:"category/women/traditionals", name: "Traditionals for Women", img: "https://imgs.search.brave.com/PHmTYcXeOHNODLzVDckHC973s4zlUst41jsa_KASqvU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y290dG9uY3VsdHVy/ZS5jby5pbi9jZG4v/c2hvcC9hcnRpY2xl/cy9FdGhuaWNfU2V0/c19mb3JfV29tZW4u/anBnP3Y9MTcyNTAx/MTA0NCZ3aWR0aD0x/MDgw" },
  { id: 2, link:"category/formal/men", name: "Formal Clothing for Men", img: "https://www.baird-group.co.uk/m/SUIT-DIRECT_GROUP-SHOT_LANDSCAPE.jpg" },
  { id: 3, link:"category/women/partywear", name: "Partywear for Women", img: "https://www.dhresource.com/webp/m/0x0/f2/albu/g20/M00/04/C7/rBNaOGBwFR2AB4ITAAG4bU5yFJc742.jpg" },
  { id: 4, link:"category/swimming", name: "Swimming Costumes", img: "https://www.arenasport.com/media/.renditions/wysiwyg/first-level-pages/home/arena-hpc-SS25-training-swimwear-680x860.jpg" },
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
      <h1 className={`text-2xl md:text-4xl uppercase tracking-wider font-bold opacity-0 ${
        hasBeenVisible ? `animate-fade-left-right` : ""
      }`}>
        <div className="flex gap-2">
          Browse:
          <span className="text-purple-500">Category.</span>
        </div>
        <p className="text-[10px] md:text-[13px] leading-4 font-light">
          Explore our categories for the best deals.
        </p>
      </h1>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {categories.map((category, index) => (
          <div 
            key={category.id} 
            className={`bg-gray-200  w-80 h-80 text-gray-800 relative rounded-[3px] shadow-lg text-center opacity-0 ${
              hasBeenVisible ? `animate-fade-in-up animation-delay-${index * 200}` : ""
            }`}
          >
           <NavLink to={category.link} >
            <div className="fixed w-80 h-80 bg-black hover:bg-opacity-15 transition-all duration-200 bg-opacity-25"> </div>
            <img src={category.img} alt={category.name} className="w-80 h-80  object-cover " /><h2 className="text-lg font-semibold">{category.name}</h2>
          </NavLink></div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
