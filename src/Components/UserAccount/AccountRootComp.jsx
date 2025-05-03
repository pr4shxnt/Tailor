import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';
import UserSidebar from './UserSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Log-in/AuthProvider';
import { ArrowBigRight } from 'lucide-react';
import ResponsiveNavbar from '../Navbar/ResponsiveNavbar';
import ScrollToTop from '../../essUtils/ScrollToTop';
import banner from "../../assets/user.acc.banner.png";
import banner2 from "../../assets/dark.banner.png";

const AccountRootComp = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isResponsive, setIsResponsive] = useState(false);

  const navigate = useNavigate();
  const { isUserAuthenticated, loading } = useContext(AuthContext);

  // Sync with localStorage and respond to changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Optional: Watch for theme change inside the app
  useEffect(() => {
    const interval = setInterval(() => {
      const storedTheme = localStorage.getItem("theme") || "light";
      if (storedTheme !== theme) setTheme(storedTheme);
    }, 500);
    return () => clearInterval(interval);
  }, [theme]);

  useEffect(() => {
    if (!loading && isUserAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserAuthenticated, loading, navigate]);

  if (loading || isUserAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />

      {/* Responsive Toggle Button */}
      <div onClick={() => setIsResponsive(true)} className="fixed top-28 md:hidden z-50">
        <ArrowBigRight size={30} />
      </div>

      {/* Navigation */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden">
        <ResponsiveNavbar />
      </div>

      {/* Banner */}
      <div className="container w-[85%] mx-auto pt-16  px-4">
        <img
          key={theme} // force re-render on theme change
          src={theme === "light" ? banner : banner2}
          alt="User Account Banner"
          className="h-80 w-full object-cover shadow-xl transition-all duration-500"
        />
      </div>

      {/* Layout */}
      <div className="container w-[85%] mx-auto  flex gap-5 px-4 pt-3">
        <UserSidebar isResponsive={isResponsive} setIsResponsive={setIsResponsive} />
        <div className="w-full">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AccountRootComp;
