import React from "react";
import BrandsFilter from "./BrandsFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import SizeFilter from "./SizeFilter";
import SliderComp from "./SliderComp";

const FilterComp = ({
  handleReset,
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
  const defaultPriceRange = [30, 17500]; // Define your default range

  return (
    <div className="">
      <div className="flex justify-between px-5 pt-3 items-center">
        <h1 className="text-xl font-bold">Filter</h1>
        <button
          className="text-secondary-tertiary flex justify-center px-3 items-center gap-1 font-thin text-sm"
          onClick={handleReset}
        >
          Reset
          <FontAwesomeIcon icon={faRotate} className="font-thin" />
        </button>
      </div>
      <div className="min-w-64">
        {/* BrandsFilter */}
        {brands.length > 1 ? (
          <BrandsFilter
            setFilteredBrands={setFilteredBrands}
            brands={brands}
            selectedBrands={selectedBrands}
          />
        ) : (
          <p></p>
        )}

        {/* SizeFilter */}
        {sizes.length > 0 ? (
          <SizeFilter
            setFilteredSizes={setFilteredSizes}
            sizes={sizes}
            selectedSizes={selectedSizes}
          />
        ) : (
          <p></p>
        )}

        {/* Price Filter */}
        <SliderComp
          setFilteredPrice={setFilteredPrice}
          defaultPriceRange={defaultPriceRange}
          minPrice={minPrice}
              maxPrice={maxPrice}
        />
      </div>
    </div>
  );
};

export default FilterComp;
