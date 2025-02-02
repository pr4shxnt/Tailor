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
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootComp