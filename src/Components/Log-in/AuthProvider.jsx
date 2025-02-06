import { createContext, useState, useEffect } from "react";

// Creating the Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Log the stored user to check if it's correctly retrieved from localStorage
    console.log("Stored user from localStorage:", storedUser);

    // Check if user data exists in localStorage
    if (storedUser) {
      try {
        // Parse the user object from localStorage
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser);

        setIsUserAuthenticated(true);
        setUser(parsedUser); // Store user data in state
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
      }
    } else {
      setIsUserAuthenticated(false);
    }
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, user, setIsUserAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;