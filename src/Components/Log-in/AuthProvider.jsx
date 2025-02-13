import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Creating the Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState([])

  
  
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser)


    // Check if user data exists in localStorage
    if (storedUser) {
     return
    } else {
      setIsUserAuthenticated(false);
    }
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, user, loading, setIsUserAuthenticated, setUser, setLoading, userData , setUserData}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;