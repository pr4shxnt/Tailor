import React, { useState } from "react";
import BrandsFilter from "../../Filter/BrandsFilter";
import SliderComp from "../../Filter/SliderComp";
import SizeFilter from "../../Filter/SizeFilter";

const FilterpageMview = ({
  handleReset,
  closeDiv,
  setFilteredBrands,
  setFilteredSizes,
  setFilteredPrice,
  sizes,
  brands,
  selectedBrands,
  selectedSizes,
  minPrice,
  maxPrice,
}) => {
  const [activeComponent, setActiveComponent] = useState('price');

  return (
    <div className="flex max-h-[70vh] flex-col h-screen">
      <div className="flex flex-grow pl-3">
        <div className="flex flex-col bg-gray-200 text-start">
          <button
            className={`py-3 px-4 border-b-2 border-gray-100 ${
              activeComponent === "price" ? "bg-white text-primary" : ""
            }`}
            onClick={() => setActiveComponent("price")}
          >
            Price
          </button>

          {/* Conditionally render the "Brands" button if brands are available */}
          {brands && brands.length > 1 && (
            <button
              className={`py-3 px-4 border-b-2 border-gray-100 ${
                activeComponent === "brands" ? "bg-white text-primary" : ""
              }`}
              onClick={() => setActiveComponent("brands")}
            >
              Brands
            </button>
          )}

          <button
            className={`py-3 px-4 border-b-2 border-gray-100 ${
              activeComponent === "size" ? "bg-white text-primary" : ""
            }`}
            onClick={() => setActiveComponent("size")}
          >
            Size
          </button>
        </div>

        {/* Main content area */}
        <div className="flex-grow bg-gray-50">
          {activeComponent === "brands" && (
            brands.length > 1 ? (
              <BrandsFilter
                setFilteredBrands={setFilteredBrands}
                brands={brands}
                selectedBrands={selectedBrands}
              />
            ) : (
              <p>No brands available.</p> // Show a message when no brands are available
            )
          )}

          {activeComponent === "size" && (
            <SizeFilter
              setFilteredSizes={setFilteredSizes}
              sizes={sizes}
              selectedSizes={selectedSizes}
            />
          )}

          {activeComponent === "price" && (
            <SliderComp setFilteredPrice={setFilteredPrice} minPrice={minPrice}
            maxPrice={maxPrice}/>
          )}

          {!activeComponent && (
            <div className="text-lg text-gray-500">No filter selected.</div>
          )}
        </div>
      </div>

      <div className="flex justify-end px-2.5 pb-1 bg-gray-100">
        <button
          className="py-2 px-4 w-full bg-gray-600 text-white"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="py-2 px-4 w-full bg-black text-white"
          onClick={closeDiv}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilterpageMview;
