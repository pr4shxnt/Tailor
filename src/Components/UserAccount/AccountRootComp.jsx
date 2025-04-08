import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'
import UserSidebar from './UserSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Log-in/AuthProvider'
import useAuth from '../../hooks/useAuth'
import { ArrowBigRight } from 'lucide-react'
import ResponsiveNavbar from '../Navbar/ResponsiveNavbar'
import ScrollToTop from '../../essUtils/ScrollToTop'

const AccountRootComp = () => {


const navigate = useNavigate()
const { isUserAuthenticated, loading, userData } = useContext(AuthContext);
const [isResponsive, setIsResponsive] = useState(false)

useEffect(() => {
    if (!loading && isUserAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserAuthenticated, loading, navigate]);

  // Wait for authentication check before rendering
  if (isUserAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
<>
<div onClick={()=>setIsResponsive(true)} className="fixed  top-28 md:hidden">
  
  <ArrowBigRight size={30}/>
</div><ScrollToTop/>
<div className="hidden md:block">
<Navbar/>
</div>
<div className="md:hidden">
  <ResponsiveNavbar/>
</div>
<div className=" h-full container w-[85%] mx-auto pt-16">
  <img src="" alt="" className="h-80 bg-black" />
</div>
<div className="pt-3  h-full flex gap-5 container w-[85%] mx-auto">
    <UserSidebar isResponsive={isResponsive} setIsResponsive={setIsResponsive}/>
    <div className="w-full">   <Outlet/></div>
 
</div>
<Footer/>
</>
 )
}

export default AccountRootComp