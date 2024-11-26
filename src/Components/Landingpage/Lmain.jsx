import React from 'react'
import Homepage from './Homepage/Homepage'
import Fmain from './Sect2/Fmain'
import AboutUSlp from './About/AboutUSlp'
import Partners from '../Partners/Partners'
import Contact2 from '../Contact/Contact2'
import { Link } from 'react-router-dom'

const Lmain = () => {
  return (
    <>
    
    <Homepage/>
    <div className="title justify-center text-center pt-16">
        <h1 className='text-4xl font-bold'>About US</h1>
        </div>
    <AboutUSlp/>
    
    <Fmain/>

    <div className="title justify-center text-center pt-16">
        <h1 className='text-4xl font-bold'>Contact Us</h1>
    </div>
    <Contact2/>

    <div className="flex flex-col justify-center align-middle text-center"><h1 className='text-4xl font-bold'>We're Trusted by</h1><p></p></div>
 
    <Partners/>

    </>
  )
}

export default Lmain
