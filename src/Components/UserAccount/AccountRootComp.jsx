import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';
import UserSidebar from './UserSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Log-in/AuthProvider';
import { ArrowBigRight } from 'lucide-react';
import ResponsiveNavbar from '../Navbar/ResponsiveNavbar';
import ScrollToTop from '../../essUtils/ScrollToTop';

const AccountRootComp = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const navigate = useNavigate();
  const { isUserAuthenticated, loading } = useContext(AuthContext);
  
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

      <div onClick={() => setIsResponsive(true)} className="fixed top-28 md:hidden z-50">
        <ArrowBigRight size={30} />
      </div>

      {/* Navigation */}
      <div className="hidden h-full md:block shadow-sm bg-white z-50"> 
        <Navbar />
      </div>
      <div className="md:hidden">
        <ResponsiveNavbar />
      </div>

    

      {/* Layout */}
      <div className="container w-[95%] mx-auto  flex gap-5 px-4 pt-20">
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
