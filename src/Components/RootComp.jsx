import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTop from '../../essUtils/ScrollToTop'
import Navbar1 from './Navbar/Navbar1'

const RootComp = () => {
  return (
    <div>
         <ScrollToTop/>
         {/* <Navbar/> */}
          <Navbar1/>
        <div className="min-h-screen min-w-screen"><Outlet/></div>
        <Footer/>
    </div>
  )
}

export default RootComp