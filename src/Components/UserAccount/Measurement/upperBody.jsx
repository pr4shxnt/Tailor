import React, { useContext, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

const formSections = [
  { key: "neck", label: "Neck", image: "/images/neck.png" },
  { key: "shoulderWidth", label: "Shoulder Width", image: "/images/shoulder-width.png" },
  { key: "chest", label: "Chest", image: "/images/chest.png" },
  { key: "upperChest", label: "Upper Chest", image: "/images/upper-chest.png" },
  { key: "waist", label: "Waist", image: "/images/waist.png" },
  { key: "hip", label: "Hip", image: "/images/hip.png" },
  { key: "armhole", label: "Armhole", image: "/images/armhole.png" },
  { key: "sleeveLength", label: "Sleeve Length", image: "/images/sleeve-length.png" },
  { key: "bicep", label: "Bicep", image: "/images/bicep.png" },
  { key: "elbow", label: "Elbow", image: "/images/elbow.png" },
  { key: "wrist", label: "Wrist", image: "/images/wrist.png" },
  { key: "jacketLength", label: "Jacket Length", image: "/images/jacket-length.png" },
];

const UpperBody = () => {
  const { upperBodyData, setUpperBodyData } = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpperBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextForm = () => {
    if (currentIndex < formSections.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevForm = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-x-6 p-4">
      {/* Image Side - Dynamically changes */}
      <div className="w-1/2 hidden md:block">
        <img
          src={formSections[currentIndex].image}
          alt={formSections[currentIndex].label}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{formSections[currentIndex].label}</h3>

        <input
          type="number"
          name={formSections[currentIndex].key}
          id={formSections[currentIndex].key}
          className="w-full p-2 border rounded-md"
          value={upperBodyData[formSections[currentIndex].key]}
          onChange={handleChange}
        />

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6">
          {/* Previous Button */}
          <button
            onClick={prevForm}
            disabled={currentIndex === 0}
            className="p-2 text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Navigation Dots */}
          <div className="flex space-x-1">
            {formSections.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextForm}
            disabled={currentIndex === formSections.length - 1}
            className="p-2 text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpperBody;
