import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'
import UserSidebar from './UserSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Log-in/AuthProvider'
import useAuth from '../../hooks/useAuth'

const AccountRootComp = () => {
const navigate = useNavigate()
const { isUserAuthenticated, loading, userData } = useContext(AuthContext);


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
<Navbar/>
<div className="pt-[70px]  h-full flex gap-5 container w-[85%] mx-auto">
    <UserSidebar/>
    <div className="w-full">   <Outlet/></div>
 
</div>
<Footer/>
</>
 )
}

export default AccountRootComp