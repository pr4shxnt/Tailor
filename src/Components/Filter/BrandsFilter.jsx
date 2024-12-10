import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const BrandsFilter = ({ brands = [], setFilteredBrands, selectedBrands = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBrandSelection = (brand) => {
    const updatedSelection = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setFilteredBrands(updatedSelection);
  };

  const filteredBrands = brands.filter((brand) =>
    typeof brand === 'string' && brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="m-5">
      <h3 className="font-semibold text-lg text-gray-700">Brands</h3>

      {/* Search bar */}
      <div className="h-10 flex font-light items-center  mr-2 my-2 ">

        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full relative pl-7 p-2 bg-gray-100 outline-primary border-none rounded-full"
        />
        <FontAwesomeIcon icon={faSearch} className="ml-2 absolute text-gray-500 mr-2" />
      </div>

      {/* Brand list */}
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 pr-2 scrollbar-track-transparent max-h-[350px] lg:max-h-80">
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand, index) => (
            <div key={index} className="flex px-1 items-center cursor-pointer font-light justify-between py-2.5 pr-2 border-t border-gray-300">
              <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">{brand}</label>
              <input
                type="checkbox"
                id={`brand-${brand}`}
                className="w-4 h-4 cursor-pointer"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandSelection(brand)}
                aria-checked={selectedBrands.includes(brand)}
                aria-label={`Select ${brand}`}
              />
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default BrandsFilter;
