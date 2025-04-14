import axios from "axios";
import React, { createContext, useState, useEffect, useCallback } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("sessionid");
  const [measurementExists, setMeasurementExists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderContainer , setOrderContainer] = useState([]);


  // 🌙 Theme State Management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Apply theme to <body> on mount and whenever theme changes
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

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

  const fetchMeasurementCheck = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/measurement/exists/${userId}`
      );
      setMeasurementExists(response.data.state);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(error.response?.data?.message || "Error fetching measurement");
    }
  };

  useEffect(() => {
    if(userId){
         fetchMeasurementCheck();
    }
 
  }, []);

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
      setError(error.response?.data?.message || "Error fetching measurement");
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
      const userId = localStorage.getItem("user");
      const data = {
        userId,
        token,
        upperBody: upperBodyData,
        lowerBody: lowerBodyData,
        additional: additionalData,
      };

      const headers = { Authorization: `Bearer ${token}` };

      let response;
      if (measurementExists) {
        response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/measurement`, data, { headers });
      } else {
        response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/measurement`, data, { headers });
      }

      console.log("Measurement saved:", response.data);
      fetchMeasurement(); // Refresh data after saving
    } catch (error) {
      console.error("Error saving measurement:", error);
      if (error.response?.status === 401) {
        console.log("Token expired while saving measurement. Refreshing...");
      }
    }
  };

  const fetchOrdersByUserId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/user/${userId}`
      );
      setOrderContainer(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.response?.data?.message || "Error fetching orders");
    }
  }


  useEffect(() => {
    if (userId) {
      fetchOrdersByUserId();
    }
  }, [userId]);

  console.log("Order Container:", orderContainer);

  return (
    <Context.Provider
      value={{
        theme,
        toggleTheme, 
        upperBodyData,
        setUpperBodyData,
        lowerBodyData,
        setLowerBodyData,
        additionalData,
        setAdditionalData,
        saveMeasurement,
        loading,
        error,
        measurementExists,
        setMeasurementExists,
        orderContainer
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
