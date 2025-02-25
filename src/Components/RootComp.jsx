import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTop from '../../essUtils/ScrollToTop'
import ResponsiveNavbar from './Navbar/ResponsiveNavbar'

const RootComp = () => {
  return (
    <div>
         <ScrollToTop/>
         
         <div className="hidden lg:block"><Navbar/></div>
         <div className="md:hidden"><ResponsiveNavbar/></div>
         <div className=""> </div>
        <div className="min-h-screen min-w-screen"><Outlet/></div>
        <Footer/>
    </div>
  )
}

export default RootComp
