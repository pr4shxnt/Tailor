import axios from "axios";
import React, { createContext, useState, useEffect, useCallback } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("sessionid");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Upper Body Measurements
  const [upperBodyData, setUpperBodyData] = useState({
    neck: "",
    shoulderWidth: "",
    chest: "",
    upperChest: "",
    waist: "",
    hip: "",
    armhole: "",
    sleeveLength: "",
    bicep: "",
    elbow: "",
    wrist: "",
    jacketLength: "",
  });

  // Lower Body Measurements
  const [lowerBodyData, setLowerBodyData] = useState({
    waist: "",
    hip: "",
    thigh: "",
    knee: "",
    calf: "",
    ankle: "",
    inseamLength: "",
    outseamLength: "",
    crotchDepth: "",
    crotchLengthFront: "",
    crotchLengthBack: "",
  });

  // Additional Measurements
  const [additionalData, setAdditionalData] = useState({
    bustPointToBustPoint: "",
    shoulderToBust: "",
    shoulderToWaist: "",
    shoulderToHip: "",
    dressLength: "",
    backWidth: "",
  });

  const fetchMeasurement = useCallback(async () => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/measurement/${userId}`
      );
      setUpperBodyData(response.data.upperBody || {});
      setLowerBodyData(response.data.lowerBody || {});
      setAdditionalData(response.data.additional || {});
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error.response && error.response.status === 404) {
        setError(error.response.data.message);
      } else {
        setError("Error fetching measurement");
      }
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchMeasurement();
  }, [fetchMeasurement]);

  // Function to save measurements
  const saveMeasurement = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/measurement`,
        {
          userId,
          token,
          upperBody: upperBodyData,
          lowerBody: lowerBodyData,
          additional: additionalData,
        }
      );
      console.log("Measurement saved:", response.data);
      
      // Fetch updated measurement data after saving
      fetchMeasurement();
    } catch (error) {
      console.error("Error saving measurement:", error);
    }
  };
  

  return (
    <Context.Provider
      value={{
        upperBodyData,
        setUpperBodyData,
        lowerBodyData,
        setLowerBodyData,
        additionalData,
        setAdditionalData,
        saveMeasurement,
        loading,
        error,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
