import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductPage from "./ProductPage";
import FilterComp from "../Filter/FilterComp";
import SortFilterButton from "./ResponsiveDD/SortFilterButton";
import SliderComp from "../Filter/SliderComp"; // Import the SliderComp component
import { Link } from "react-router-dom";
import axios from "axios";

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

  const [products, setProducts] = useState([]);

  const productsFetch = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
    const data = await response.data;
    setProducts(data);

    // Calculate the initial price range for all products
    const prices = data.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setFilteredPrice([minPrice, maxPrice]); // Set initial filteredPrice range
  };

  useEffect(() => {
    productsFetch();
  }, [masterCategory, category, subCategory, brand]);

  useEffect(() => {
    let filtered = products;

    if (masterCategory && masterCategory !== "all_collection") {
      filtered = filtered.filter((product) => product.masterCategory === masterCategory);
    }
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (subCategory) {
      filtered = filtered.filter((product) => product.subCategory === subCategory);
    }
    if (brand) {
      filtered = filtered.filter((product) => product.brand && product.brand.toLowerCase() === brand.toLowerCase());
    }

    setFilteredProducts(filtered);

    // Extract unique brands and sizes for the filters
    const br4nds = [...new Set(filtered.map((product) => product.brand))];
    const sizes = [...new Set(filtered.map((product) => product.size))];
    setFilteredBrandsLocal(br4nds);
    setFilteredSizesLocal(sizes);
  }, [masterCategory, category, subCategory, brand, products]);

  useEffect(() => {
    setFilteredBrands(selectedBrands);
    setFilteredSizes(selectedSizes);
  }, [selectedBrands, selectedSizes, filteredPrice]);

  const handleBrandChange = (br4nds) => setSelectedBrands(br4nds);
  const handleSizeChange = (sizes) => setSelectedSizes(sizes);
  const handlePriceChange = (price) => setFilteredPrice(price);

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    // Reset price to the full range
    setFilteredPrice([Math.min(...products.map((product) => product.price)), Math.max(...products.map((product) => product.price))]);
  };

  // Filter and sort the final products
  const filteredFinalProducts = filteredProducts
    .filter((product) => {
      const isBrandMatch = !filteredBrands.length || filteredBrands.includes(product.brand);
      const isSizeMatch = !filteredSizes.length || filteredSizes.includes(product.size);
      const isPriceMatch = product.price >= filteredPrice[0] && product.price <= filteredPrice[1];
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
    <section className="bg-gray-100 pt-16 lg:mx-10 mb-20 min-h-screen">
      <div className="flex flex-col">
        {/* Mobile Sort/Filter Button */}
        <div className="block fixed top-[60px] border-t w-full z-[1000] lg:hidden">
          <SortFilterButton
            minPrice={filteredPrice[0]}
            maxPrice={filteredPrice[1]}
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
            setFilteredPrice={handlePriceChange}
          />
        </div>

        {/* Breadcrumbs */}
        <div className="hidden lg:block">
          {brand ? null : (
            <p className="pt-10 text-xs text-gray-500">
              <Link to="/"><span className="text-blue-400">Home</span></Link>
              <Link to={`/category/all_collection`}>{"> All Products"}</Link>
              <Link to={`/category/${encodeURIComponent(masterCategory)}`}>{masterCategory ? ` > ${masterCategory.charAt(0).toUpperCase() + masterCategory.slice(1)}` : ""}</Link>
              <Link to={`/category/${encodeURIComponent(masterCategory)}/${encodeURIComponent(category)}`}>{category ? ` > ${category.charAt(0).toUpperCase() + category.slice(1)}` : ""}</Link>
              {subCategory ? ` > ${subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}` : ""}
            </p>
          )}
        </div>

        <div className="flex lg:bg-white mt-5 pt-5 lg:pt-0 pb-3 lg:pb-14">
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
              minPrice={filteredPrice[0]}
              maxPrice={filteredPrice[1]}
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
    </section>
  );
};

export default Collection;
