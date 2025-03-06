import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Components/Log-in/AuthProvider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {

  // header of hook

  const { setUser, user, isUserAuthenticated, setIsUserAuthenticated, setLoading, userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState("");





  // 1st if statement: if not authenticated set Loading state to false as it authentication state is not undefined

  if (!isUserAuthenticated) {
    setLoading(false);
  }





  




  // Updated: Use user.id if user is an object

  const getUserDetailsById = async () => {

    // Get user ID from storage
    const userId = localStorage.getItem("user"); 
    
    // break function if no userID exists
    if (!userId) return; 

    try {

      // send user ID to backend to recieve response
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`); 

      // set user data to response data
      setUserData(response.data); 

    } catch (error) {
      console.error("Error fetching user details:", error); 
    }
  };



 // useEffect to fetch user details by ID

  useEffect(() => {
    getUserDetailsById();
  }, [user]); // -------> Fetch when user changes : user is a dependency to trigger this useEffect










  // if token and user id comes from serverside store it in local storage and set authentication state true

  useEffect(() => {
    // Get token from localStorage
    const savedToken = localStorage.getItem("sessionid"); 

    if (savedToken) {
      try {

        // Decode token using jwt-decode
        const decodedToken = jwtDecode(savedToken); 

        if (decodedToken.exp * 1000 < Date.now()) {

          // If expired, update useState for authentication to false
          setIsUserAuthenticated(false); 

          // Remove expired session id token
          localStorage.removeItem("sessionid"); 

          // Remove user ID after removing session id
          localStorage.removeItem("user"); 
          alert("Your session has expired. Please log in again.");
        } else {

          //setting token if not expired
          setToken(savedToken); 

          //useState update to true for authentication
          setIsUserAuthenticated(true); 
        }
      } catch (error) {

        // if some error useState update for authentication to false
        setIsUserAuthenticated(false); 

         // and remove invalid session id token
        localStorage.removeItem("sessionid");

        // Remove user ID after removing session id
        localStorage.removeItem("user"); 
      }
    } else {
      setIsUserAuthenticated(false);
    }

    setLoading(false);
  }, [setIsUserAuthenticated, setLoading]); //----> dependencies for triggering useEffect









  // login function to send POST request to server side

  const login = async (email, password) => {
    try {

       // sending a POST request to the server side
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {

        // userData declaration and storing
        const userData = response.data.user; 

        // userID declaration and storing
        const userToken = response.data.token; 

        // Store token and user id in localStorage
        localStorage.setItem("sessionid", userToken);
        localStorage.setItem("user", userData.id);
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










  //logout function to remove token and user from localstorage and set token to empty string

  const logout = () => {

    // Remove token from localStorage
    localStorage.removeItem("sessionid"); 

    // Remove user ID from localStorage
    localStorage.removeItem("user"); 
    setToken(""); 
    setUser(null);

     // Update authentication state
    setIsUserAuthenticated(false);

    // Set loading to true
    setLoading(true); 
  };










  // Axios Interceptor: handles token expiration


  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("Token expired or unauthorized");
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
