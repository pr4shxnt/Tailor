import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import Marquee from './Marquee'

const Footer = () => {
  return (
    <div>
      <div className="min-h-[65vh] justify-center flex flex-col items-center bg-secondary text-second-secondary">
        
          <div className="h-[100%] flex flex-col md:flex-row pt-14 justify-between w-full px-8 py-10 md:px-28">
          <div className="h-[100% ] py-10 flex flex-col justify-center">
            <h1 className="text-5xl font-bold">SHANTA</h1>
            <h1 className="text-5xl ml-10 font-bold text-purple-500">TAILORS</h1>
            <p className='flex justify-end w-full'>since 2005 A.D.</p>
          </div>
          <div className="grid lg:flex gap-10 items-start py-10 grid-cols-2 ">
            <div className="">
              <h1 className='text-xl md:text-2xl font-bold '>QuickLinks</h1>
              <div className="flex text-xs md:text-sm font-semibold pl-4  pt-2 flex-col">
              <NavLink className="hover:underline  ">Home</NavLink>
              <NavLink className="hover:underline   ">About</NavLink>
              <NavLink className="hover:underline   ">All Collection</NavLink>
              <NavLink className="hover:underline   ">Contact</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              </div>
            </div>

            <div className="grid lg:flex gap-10 grid-cols-2 ">
            <div className="">
              <h1 className='text-xl md:text-2xl font-bold '>Links</h1>
              <div className="flex text-xs md:text-sm font-semibold pl-4 pt-2 flex-col">
              <NavLink className="hover:underline  ">Home</NavLink>
              <NavLink className="hover:underline   ">About</NavLink>
              <NavLink className="hover:underline   ">All Collection</NavLink>
              <NavLink className="hover:underline   ">Contact</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              </div>
            </div>
            </div>

            <div className="">
              <h1 className='text-xl md:text-2xl font-bold '>Redirects</h1>
              <div className="flex text-xs md:text-sm font-semibold pl-4 pt-2 flex-col">
              <NavLink className="hover:underline   ">Home</NavLink>
              <NavLink className="hover:underline   ">About</NavLink>
              <NavLink className="hover:underline   ">All Collection</NavLink>
              <NavLink className="hover:underline   ">Contact</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              </div>
            </div>

            <div className="">
              <h1 className='text-xl md:text-2xl font-bold '>Socials</h1>
              <div className="flex text-xs md:text-sm font-semibold pl-4 pt-2 flex-col">
              <NavLink className="hover:underline   ">Home</NavLink>
              <NavLink className="hover:underline   ">About</NavLink>
              <NavLink className="hover:underline   ">All Collection</NavLink>
              <NavLink className="hover:underline   ">Contact</NavLink>
              <NavLink className="hover:underline   ">Cart</NavLink>
              <NavLink className="hover:underline   ">Orders</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-2 py-3 text-sm bg-gray-500 ">
      <p className="  text-center  text-gray-100 text-xs md:text-sm font-semibold">Shanta Tailors <sup>©</sup> Copyright 2025 | Design and Developed by <a className='hover:underline text-blue-500' target='_blank' href="https://www.prashantadhikari7.com.np">Prashant Adhikari</a></p>

      </div>
    </div>
  )
}

export default Footer