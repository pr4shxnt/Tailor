import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Creating the Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState([])
  const [cartPrice , setCartPrice] = useState(0)
  const[CartDataCount, setCartDataCount] =useState()
  const [cartData, setCartData] = useState([])
const token = localStorage.getItem("sessionid")
 
    const fetchCart = async () => {
        if (!token) return;

        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${token}`);
            setCartData(response.data);
            setCartDataCount(response.data.items.length)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };
    useEffect(() => {
     
    fetchCart();
    
}, [token]); // Runs when session changes or cart updates 

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
    <AuthContext.Provider value={{ isUserAuthenticated, CartDataCount, fetchCart, token, user, loading, setIsUserAuthenticated, setUser, setLoading, userData , setUserData, cartData}}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;