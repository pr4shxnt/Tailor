import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SizeFilter = ({ sizes = [], setFilteredSizes, selectedSizes = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSizeSelection = (size) => {
    const updatedSelection = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setFilteredSizes(updatedSelection);
  };

  // Filter sizes by search query while ensuring that size is a string before calling toLowerCase
  const filteredSizes = sizes.filter((size) =>
    typeof size === 'string' && size.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="m-5">
      <h3 className="font-semibold text-lg text-gray-700">Sizes</h3>

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

      {/* Size list */}
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 pr-2 scrollbar-track-transparent max-h-[350px] lg:max-h-80">
        {filteredSizes.length > 0 ? (
          filteredSizes.map((size, index) => (
            <div
              key={index}
              className="flex px-1 items-center cursor-pointer font-light justify-between py-2.5 pr-2 border-t border-gray-300"
            >
              <label htmlFor={`size-${size}`} className="cursor-pointer text-sm">
                {size}
              </label>
              <input
                type="checkbox"
                id={`size-${size}`}
                className="w-4 h-4 cursor-pointer"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeSelection(size)}
                aria-checked={selectedSizes.includes(size)}
                aria-label={`Select ${size}`}
              />
            </div>
          ))
        ) : (
          <p>No sizes found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default SizeFilter;
