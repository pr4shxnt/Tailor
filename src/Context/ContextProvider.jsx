import axios from "axios";
import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("sessionid");




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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
