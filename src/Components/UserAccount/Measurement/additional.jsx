import React, { useContext, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

const formSections = [
  { key: "waist", label: "Waist", image: "/images/waist.png" },
  { key: "hip", label: "Hip", image: "/images/hip.png" },
  { key: "thigh", label: "Thigh", image: "/images/thigh.png" },
  { key: "knee", label: "Knee", image: "/images/knee.png" },
  { key: "calf", label: "Calf", image: "/images/calf.png" },
  { key: "ankle", label: "Ankle", image: "/images/ankle.png" },
  { key: "inseamLength", label: "Inseam Length", image: "/images/inseam-length.png" },
  { key: "outseamLength", label: "Outseam Length", image: "/images/outseam-length.png" },
  { key: "crotchDepth", label: "Crotch Depth", image: "/images/crotch-depth.png" },
  { key: "crotchLengthFront", label: "Crotch Length Front", image: "/images/crotch-length-front.png" },
  { key: "crotchLengthBack", label: "Crotch Length Back", image: "/images/crotch-length-back.png" },
];

const Additional = () => {
  const { additionalData, setAdditionalData, saveMeasurement } = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6 p-4">
      <div className="md:w-1/2 w-full">
        <img
          src={formSections[currentIndex].image}
          alt={formSections[currentIndex].label}
          className="w-full h-auto object-contain"
        />
      </div>

      <form className="w-full md:w-1/2 bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-4">{formSections[currentIndex].label}</h3>

        <input
          type="number"
          name={formSections[currentIndex].key}
          className="w-full p-2 border rounded-md"
          value={additionalData[formSections[currentIndex].key]}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between mt-6">
          <button type="button" onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}>
            <ChevronLeft size={32} />
          </button>
          <button type="button" onClick={() => setCurrentIndex((prev) => Math.min(formSections.length - 1, prev + 1))}>
            <ChevronRight size={32} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Additional;
