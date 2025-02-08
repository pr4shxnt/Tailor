import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTop from '../../essUtils/ScrollToTop'

const RootComp = () => {
  return (
    <div>
         <ScrollToTop/>
        <Navbar/>
        <div className="min-h-screen min-w-screen"><Outlet/></div>
        
        <Footer/>
    </div>
  )
}

export default RootComp