import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import Products from "../../Data/Products"; // Adjust the path as needed

const CollectionDropdown = () => {
  const scrollContainerRef = useRef(null);

  const [products, setProducts] = useState([]);


  const productsFetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`)
      const data = await response.data

      
      setProducts(data)
  }
  
console
  useEffect(() => {
      productsFetch()
  }, [])

  

  // Extract unique masterCategories, categories, and subCategories
  const hierarchy = products.reduce((acc, product) => {
    const { masterCategory, category, subCategory } = product;
    if (!acc[masterCategory]) acc[masterCategory] = {};
    if (!acc[masterCategory][category]) acc[masterCategory][category] = new Set();
    acc[masterCategory][category].add(subCategory);
    return acc;
  }, {});

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className=" w-full p-6 bg-primary border-t border-primary shadow-md">

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-tertiary text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none"
        >
          ‹
        </button>
        <button
          onClick={scrollRight}
          className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-tertiary text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none"
        >
          ›
        </button>

        {/* Scrollable Section */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-hidden no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
        >
          {Object.keys(hierarchy).map((masterCat, index) => (
            <div
              key={index}
              className="min-w-[250px] flex-shrink-0 bg-second-primary p-4 rounded shadow hover:shadow-lg transition"
            >
              {/* Link to /category/:masterCategory */}
              <Link
                to={`/category/${encodeURIComponent(masterCat)}`}
                className="block text-tertiary font-bold text-lg hover:underline"
              >
                {masterCat}
              </Link>
              <div className="mt-3 space-y-2">
                {Object.keys(hierarchy[masterCat]).map((cat, idx) => (
                  <div key={idx}>
                    {/* Link to /category/:masterCategory/:category */}
                    <Link
                      to={`/category/${encodeURIComponent(
                        masterCat
                      )}/${encodeURIComponent(cat)}`}
                      className="block text-second-secondary font-medium hover:text-blue-500"
                    >
                      {cat}
                    </Link>
                    <ul className="pl-4 mt-1 space-y-1 text-sm text-second-secondary">
                      {[...hierarchy[masterCat][cat]].map((subCat, id) => (
                        <li key={id}>
                          {/* Link to /category/:masterCategory/:category/:subCategory */}
                          <Link
                            to={`/category/${encodeURIComponent(
                              masterCat
                            )}/${encodeURIComponent(cat)}/${encodeURIComponent(
                              subCat
                            )}`}
                            className="hover:text-blue-500"
                          >
                            {subCat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionDropdown;
