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

  



    
    </>
  )
}

export default Lmain
