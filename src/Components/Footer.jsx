import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import Marquee from './Marquee'

const Footer = () => {
  return (
    <div>
      <div className=" min-h-[70vh] flex flex-col items-center bg-gray-200 text-black">
        <div className="w-full h-2 shadow-2xl bg-gray-500"></div>
        
          <div className="flex pt-14 justify-between w-full px-28">
          <div className="">
            <img src={logo} alt="" className="h-40" />
          </div>
          <div className="grid lg:flex gap-10 grid-cols-2 ">
            <div className="">
              <h1 className='text-2xl font-semibold '>QuickLinks</h1>
              <div className="flex pl-4 pt-2 flex-col">
              <NavLink className="hover:underline font-light">Home</NavLink>
              <NavLink className="hover:underline font-light ">About</NavLink>
              <NavLink className="hover:underline font-light ">All Collection</NavLink>
              <NavLink className="hover:underline font-light ">Contact</NavLink>
              <NavLink className="hover:underline font-light ">Cart</NavLink>
              <NavLink className="hover:underline font-light ">Orders</NavLink>
              </div>
            </div>

            <div className="grid lg:flex gap-10 grid-cols-2 ">
            <div className="">
              <h1 className='text-2xl font-semibold '>QuickLinks</h1>
              <div className="flex pl-4 pt-2 flex-col">
              <NavLink className="hover:underline font-light">Home</NavLink>
              <NavLink className="hover:underline font-light ">About</NavLink>
              <NavLink className="hover:underline font-light ">All Collection</NavLink>
              <NavLink className="hover:underline font-light ">Contact</NavLink>
              <NavLink className="hover:underline font-light ">Cart</NavLink>
              <NavLink className="hover:underline font-light ">Orders</NavLink>
              </div>
            </div>
            </div>

            <div className="">
              <h1 className='text-2xl font-semibold '>QuickLinks</h1>
              <div className="flex pl-4 pt-2 flex-col">
              <NavLink className="hover:underline font-light ">Home</NavLink>
              <NavLink className="hover:underline font-light ">About</NavLink>
              <NavLink className="hover:underline font-light ">All Collection</NavLink>
              <NavLink className="hover:underline font-light ">Contact</NavLink>
              <NavLink className="hover:underline font-light ">Cart</NavLink>
              <NavLink className="hover:underline font-light ">Orders</NavLink>
              </div>
            </div>

            <div className="">
              <h1 className='text-2xl font-semibold '>QuickLinks</h1>
              <div className="flex pl-4 pt-2 flex-col">
              <NavLink className="hover:underline font-light ">Home</NavLink>
              <NavLink className="hover:underline font-light ">About</NavLink>
              <NavLink className="hover:underline font-light ">All Collection</NavLink>
              <NavLink className="hover:underline font-light ">Contact</NavLink>
              <NavLink className="hover:underline font-light ">Cart</NavLink>
              <NavLink className="hover:underline font-light ">Orders</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-2 py-3 text-sm bg-gray-500 ">
      <p className="  text-center  text-gray-100 text-xs md:text-sm">Shanta Tailors <sup>©</sup> Copyright 2025 | Design and Developed by <a className='hover:underline text-blue-500' target='_blank' href="https://www.prashantadhikari7.com.np">Prashant Adhikari</a></p>

      </div>
    </div>
  )
}

export default Footer