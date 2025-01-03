import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPage from "./ProductPage";
import FilterComp from "../Filter/FilterComp";
import products from "../../Data/Products";
import SortFilterButton from "./ResponsiveDD/SortFilterButton";
import SliderComp from "../Filter/SliderComp"; // Import the SliderComp component
import { Link } from "react-router-dom"
const Collection = () => {
  const { category, subCategory, masterCategory, brand } = useParams();
  const [sortOrder, setSortOrder] = useState(null); // 'asc' for low to high, 'desc' for high to low
  const [sortState, setSortState] = useState(null);

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [filteredPrice, setFilteredPrice] = useState([0, 5000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredBrandsLocal, setFilteredBrandsLocal] = useState([]);
  const [filteredSizesLocal, setFilteredSizesLocal] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    // Filter products based on the provided masterCategory, category, subCategory, and brand
    let filtered = products;

    if (masterCategory) {
      filtered = filtered.filter(
        (product) => product.masterCategory === masterCategory
      );
    }
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (subCategory) {
      filtered = filtered.filter(
        (product) => product.subCategory === subCategory
      );
    }

    if (brand) {
      filtered = filtered.filter((product) => {
        return (
          product.brand && product.brand.toLowerCase() === brand.toLowerCase()
        );
      });
    }
    setFilteredProducts(filtered);

    // Extract unique brands and sizes for the filters
    const br4nds = [...new Set(filtered.map((product) => product.brand))];
    const sizes = [...new Set(filtered.map((product) => product.size))];
    setFilteredBrandsLocal(br4nds);
    setFilteredSizesLocal(sizes);
  }, [masterCategory, category, subCategory, brand]);

  useEffect(() => {
    setFilteredBrands(selectedBrands);
    setFilteredSizes(selectedSizes);
  }, [selectedBrands, selectedSizes, filteredPrice]);

  const handleBrandChange = (br4nds) => setSelectedBrands(br4nds);
  const handleSizeChange = (sizes) => setSelectedSizes(sizes);
  const handlePriceChange = (price) => setFilteredPrice(price);

  const defaultPriceRange = [30, 17500];

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setFilteredPrice([min,max]);
  };

  // Calculate dynamic minPrice and maxPrice for the slider
  const prices = filteredProducts.map((product) => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Filter and sort the final products
  const filteredFinalProducts = filteredProducts
    .filter((product) => {
      const isBrandMatch =
        !filteredBrands.length || filteredBrands.includes(product.brand);
      const isSizeMatch =
        !filteredSizes.length || filteredSizes.includes(product.size);
      const isPriceMatch =
        product.price >= filteredPrice[0] && product.price <= filteredPrice[1];
      return isBrandMatch && isSizeMatch && isPriceMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0; // No sorting
    });

  const showCase = () => {
    if (sortState === "asc") return "Price: Low to High";
    if (sortState === "desc") return "Price: High to Low";
    return "";
  };

  return (
    <section className="bg-gray-100 lg:mx-10 mb-20 min-h-screen">
        <div className="md:container">
      <div className="flex flex-col">
        {/* Mobile Sort/Filter Button */}
        <div className="block lg:hidden">
          <SortFilterButton
          minPrice={minPrice}
          maxPrice={maxPrice}
            showCase={showCase()}
            handleReset={handleReset}
            setSortOrder={setSortOrder}
            setSortState={setSortState}
            setFilteredBrands={handleBrandChange}
            brands={filteredBrandsLocal}
            selectedBrands={selectedBrands}
            setFilteredSizes={handleSizeChange}
            sizes={filteredSizesLocal}
            selectedSizes={selectedSizes}
            setFilteredPrice={setFilteredPrice}
          />
        </div>

        {/* Breadcrumbs */}
        <div className="hidden lg:block">
          {brand ? null : (
            <p className=" pt-10 text-xs text-gray-500">
                <Link  to="/">

              <span className="text-blue-400">Home</span></Link>
              <Link to={`/category/${encodeURIComponent(masterCategory)}`}>{
masterCategory ? ` > ${
                    masterCategory.charAt(0).toUpperCase() +
                    masterCategory.slice(1)
                  }`
                : ""}</Link>

<Link to={`/category/${encodeURIComponent(masterCategory)}/${encodeURIComponent(category)}`}>
              {category
                ? ` > ${category.charAt(0).toUpperCase() + category.slice(1)}`
                : ""}
                </Link>


              {subCategory
                ? ` > ${
                    subCategory.charAt(0).toUpperCase() + subCategory.slice(1)
                  }`
                : ""}
            </p>
          )}
        </div>

        <div className="flex lg:bg-white mt-5  pb-3 lg:pb-14">
          {/* Desktop Filter Component */}
          <div className="hidden lg:block">
            <FilterComp
              handleReset={handleReset}
              setSortOrder={setSortOrder}
              setSortState={setSortState}
              setFilteredBrands={handleBrandChange}
              brands={filteredBrandsLocal}
              selectedBrands={selectedBrands}
              setFilteredSizes={handleSizeChange}
              sizes={filteredSizesLocal}
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedSizes={selectedSizes}
              setFilteredPrice={handlePriceChange}
            />

          </div>

          {/* Product Page */}
          <ProductPage
            setSortOrder={setSortOrder}
            setSortState={setSortState}
            showCase={showCase()}
            filteredBrands={filteredBrands}
            filteredSizes={filteredSizes}
            filteredPrice={filteredPrice}
            filteredFinalProducts={filteredFinalProducts}
          />
        </div>
      </div>
      </div>
    </section>
  );
};

export default Collection;
