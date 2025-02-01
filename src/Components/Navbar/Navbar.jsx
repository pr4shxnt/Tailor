import React, { useState } from 'react'
import {assets} from '../../assets/assets'
import { Link,  NavLink } from 'react-router-dom'
import "./Navbar.css"
import CollectionDropdown from '../Dropdown/CollectionDropdown'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
  return (
    <div className=" fixed flex w-full items-center  justify-between md:px-10 px-3  shadow-lg  z-[999]  bg-white  font-medium">
        <img src={assets.logo} className='w-28 py-1' alt="" />

<div className="">
        <ul className='hidden md:flex gap-5 text-sm text-gray-700 '>
            <NavLink to='/' className="flex py-5 flex-col items-center gap-1">
                <p>Home</p>
                <hr className='w-5/6 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
            <NavLink to='/about' className="flex py-5 flex-col items-center gap-1">
                <p>About</p>
                <hr className='w-5/6 border-none h-[1.5px] transition-all duration-500 bg-gray-700 hidden'/>
            </NavLink>
            <div className=" group">
            <NavLink to='/category/all_collection' className="flex py-5   flex-col items-center gap-1">
                <p>Collection</p>
                </NavLink>
                <hr className='  border-none  h-[1.5px] bg-gray-700 hidden'/>
                <div className="hidden fixed mt-2 left-0 right-0 w-full group-hover:flex top-14"><CollectionDropdown/></div>
                </div>

            <NavLink to='/contact' className="flex py-5 flex-col items-center gap-1">
                <p>Contact</p>
                <hr className='w-5/6 border-none h-[1.5px] bg-gray-700 hidden'/>
            </NavLink>
        </ul>
</div>
        <div className="flex items-center gap-6">

            <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
            <div className="group relative">
                <img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" />
                <div className="group-hover:block hidden absolute dropdown-menu z-[999] right-0 pt-4">
                    <div className="flec flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                        <p className="cursor-pointer hover:text-black">My Profile</p>
                        <p className="cursor-pointer hover:text-black">Orders</p>
                        <p className="cursor-pointer hover:text-black">Logout</p>
                    </div>
                </div>
            </div>

            <Link className='relative' to="/cart">
            <img src={assets.cart_icon} className='w-5' alt="" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
            </Link>

            <img onClick={()=>{
                setVisible(true)
            }} src={assets.menu_icon} className='w-5 cursor-pointer md:hidden' alt="" />
        </div>
        {/* responsive */}
<div className={` fixed z-[999] top-24 m-3 backdrop-blur-3xl  right-0 bottom-0 overflow-hidden   rounded-lg transition-all ${visible? "w-[95vw]": "w-0"}`}>
<div className="flex flex-col text-gray-600">
    <div className="flex cursor-pointer items-center gap-1 p-3">
<img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
<p onClick={
    ()=>setVisible(false)
} className="">Back</p>
    </div>
    <NavLink onClick={
        ()=>setVisible(false)
    } className="py-2 pl-6" to="/">HOME</NavLink>
    <NavLink onClick={
        ()=>setVisible(false)
    } className="py-2 pl-6" to="/collection">COLLECTION</NavLink>
    <NavLink onClick={
        ()=>setVisible(false)
    } className="py-2 pl-6" to="/about">ABOUT</NavLink>
    <NavLink onClick={
        ()=>setVisible(false)
    } className="py-2 pl-6" to="/contact">CONTACT</NavLink>
    </div>
</div>
    </div>
  )
}

export default Navbar
