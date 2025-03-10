import React, { useContext, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import axios from "axios";

const LowerBody = () => {
  const { lowerBodyData, setLowerBodyData, saveMeasurement } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLowerBodyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await saveMeasurement();
      alert("Measurements saved successfully!");
    } catch (err) {
      setError("Error saving measurements. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Lower Body Measurements</h2>

      {error && <p className="text-red-500">{error}</p>}

      {Object.keys(lowerBodyData).map((key) => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
          <input
            type="text"
            name={key}
            value={lowerBodyData[key]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Measurements"}
      </button>
    </form>
  );
};

export default LowerBody;
