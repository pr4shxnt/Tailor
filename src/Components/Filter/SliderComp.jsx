import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import "../../index.css";

const SliderComp = ({ minPrice, maxPrice, setFilteredPrice }) => {
  const [values, setValues] = useState([minPrice, maxPrice]);

  // Update local state and parent state when the price range changes
  const handleChange = (newValues) => {
    setValues(newValues);
    if (setFilteredPrice) {
      setFilteredPrice(newValues); // Sync with parent component
    }
  };

  // Ensure the local state is updated if minPrice or maxPrice changes
  useEffect(() => {
    setValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <div className="m-5">
      <div className="w-full">
        <h3 className="font-semibold text-lg text-gray-700">Price Range</h3>
        <small className="text-gray-500 font-medium text-xs">
          Select a price range
        </small>
        <div className="values font-light">
          NPR.{values[0]} - NPR.{values[1]}
        </div>
        <ReactSlider
          className="slider w-full h-1 bg-primary mt-6 rounded-lg"
          thumbClassName="thumb w-4 h-4 bg-black -top-[6px] rounded-full cursor-pointer"
          trackClassName="track h-1 bg-gray-400 rounded-full"
          value={values}
          onChange={handleChange}
          min={minPrice}
          max={maxPrice}
          step={10}
          // renderThumb={(props) => <div {...props}  className="thumb w-4 h-4 bg-[#72C2F5]  " />}
        />
      </div>
    </div>
  );
};

export default SliderComp;
