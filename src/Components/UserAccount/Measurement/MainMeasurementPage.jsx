import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UpperBody from "./upperBody";
import lowerBody from "./lowerBody";
import Additional from "./additional";


const sections = [
  { key: "upperBody", label: "Upper Body", component: <UpperBody /> },
  { key: "lowerBody", label: "Lower Body", component: <lowerBody /> },
  { key: "additional", label: "Additional", component: <Additional /> },
];

const MainMeasurementPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSection = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSection = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">{sections[currentIndex].label}</h2>

      <div className="p-4 bg-white shadow-lg rounded-lg transition-all flex items-center justify-between">
        {/* Previous Button - Disabled on First Section */}
        <button
          onClick={prevSection}
          disabled={currentIndex === 0}
          className={`p-2 text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
        >
          <ChevronLeft size={32} />
        </button>

        <div className="w-full">{sections[currentIndex].component}</div>

        {/* Next Button - Disabled on Last Section */}
        <button
          onClick={nextSection}
          disabled={currentIndex === sections.length - 1}
          className={`p-2 text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default MainMeasurementPage;
