import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Log-in/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { setUser,isUserAuthenticated, setIsUserAuthenticated, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState("");


  if(!isUserAuthenticated){
    setLoading(false)
  }

  useEffect(() => {
    const savedToken = sessionStorage.getItem("sessionid");
    if (savedToken) {
      try {
        const decodedToken = jwtDecode(savedToken);

        // Check if the token has expired
        if (decodedToken.exp * 1000 < Date.now()) {
          setIsUserAuthenticated(false);
          sessionStorage.removeItem("sessionid");

          // Instead of redirecting, show a session expiration message
          alert("Your session has expired. Please log in again.");

        } else {
          setToken(savedToken);
          setIsUserAuthenticated(true);
        }
      } catch (error) {
        setIsUserAuthenticated(false);
        sessionStorage.removeItem("sessionid");
      }
    } else {
      setIsUserAuthenticated(false);
    }

    setLoading(false);
  }, [setIsUserAuthenticated, setLoading]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const userData = response.data.user;
        const userToken = response.data.token;

        // Store token in sessionStorage and user data in localStorage
        sessionStorage.setItem("sessionid", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(userToken);
        setUser(userData);
        setIsUserAuthenticated(true);
        setLoading(false);

        console.log("User successfully logged in");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("sessionid");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setIsUserAuthenticated(false);
    setLoading(true);
    console.log("User logged out");

    // Only redirect if it's NOT a modal login
 
  };

  // Axios Interceptor: handles token expiration
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Token expired or unauthorized");

          // Instead of logging out, show an alert
          alert("Your session has expired. Please log in again.");
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return { login, logout, token };
};

export default useAuth;
