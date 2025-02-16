import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Creating the Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const[CartDataCount, setCartDataCount] =useState()
  const [cartData, setCartData] = useState([])
const token = sessionStorage.getItem("sessionid")
 
    const fetchCart = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${token}`);
            setCartData(response.data);
            setCartDataCount(response.data.items.length)
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };
    useEffect(() => {
     
    fetchCart();
    
}, [token]); // Runs when session changes or cart updates


console.log(CartDataCount);


  
  

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
    <AuthContext.Provider value={{ isUserAuthenticated, CartDataCount, fetchCart, user, loading, setIsUserAuthenticated, setUser, setLoading, userData , setUserData}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;