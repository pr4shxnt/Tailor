import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Log-in/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
          setIsUserAuthenticated(false);
          sessionStorage.removeItem("sessionid");
          navigate("/login");
        } else {
          setToken(savedToken);
          setIsUserAuthenticated(true);
        }
      } catch (error) {
        setIsUserAuthenticated(false);
        sessionStorage.removeItem("sessionid");
        navigate("/login");
      }
    } else {
      setIsUserAuthenticated(false);
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

        // Store token in sessionStorage and user data in localStorage
        sessionStorage.setItem("sessionid", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(userToken);
        setUser(userData);
        setIsUserAuthenticated(true);

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
    console.log("User logged out");
    };

  // Axios Interceptor: handles token expiration
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Token expired or unauthorized");
          logout(); // Log the user out if token expired
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor on component unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return { login, logout, token };
};

export default useAuth;
