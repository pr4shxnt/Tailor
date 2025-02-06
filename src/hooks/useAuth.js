import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Log-in/AuthProvider";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";  // Ensure you're using the correct package to decode JWT

const useAuth = () => {
  const { setUser, setIsUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("sessionid") || "");

  useEffect(() => {
    const savedToken = sessionStorage.getItem("sessionid");
    if (savedToken) {
      try {
        const decodedToken = jwtDecode(savedToken);

        // Check if the token has expired
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired
          setIsUserAuthenticated(false);
          sessionStorage.removeItem("sessionid"); // Remove expired token
          navigate("/login"); // Redirect to login page
        } else {
          // Token is valid
          setToken(savedToken);
          setIsUserAuthenticated(true);
        }
      } catch (error) {
        setIsUserAuthenticated(false);
        sessionStorage.removeItem("sessionid"); // Remove invalid token
        navigate("/login"); // Redirect to login page if the token is invalid
      }
    } else {
      setIsUserAuthenticated(false); // No token, set as not authenticated
      navigate("/login"); // Redirect to login page if there's no token
    }
  }, [navigate, setIsUserAuthenticated]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const userData = response.data.user;
        const userToken = response.data.token;

        // Store the token in sessionStorage
        sessionStorage.setItem("sessionid", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(userToken); // Update token state with the new token

        setUser(userData);
        setIsUserAuthenticated(true);

        console.log("User successfully logged in");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    // Clear session storage and reset user state
    sessionStorage.removeItem("sessionid");
    localStorage.removeItem("user");
    setToken("");  // Clear token in state
    setUser(null);  // Clear user data
    setIsUserAuthenticated(false);  // Set authentication to false
    console.log("User logged out");

    // Redirect to login page
    navigate("/login"); // Redirect to login
  };

  // Intercept any axios requests to handle token expiration
  axios.interceptors.response.use(
    (response) => response, // Pass through the response if no error
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token expired or unauthorized
        console.log("Token expired or unauthorized");
        logout();  // Log the user out
      }
      return Promise.reject(error);
    }
  );

  return { login, logout, token };
};

export default useAuth;
