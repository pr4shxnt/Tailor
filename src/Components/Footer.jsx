import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <div>
      <div className=" min-h-[70vh] flex items-center bg-gray-300 text-black">
          <div className="flex justify-between w-full px-28">
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
    </div>
  )
}

export default Footer