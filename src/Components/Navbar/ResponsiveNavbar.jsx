import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CollectionDropdown from '../Dropdown/CollectionDropdown'

const ResponsiveNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isCollectionOpen, setIsCollectionOpen] = useState(false)

    return (
        <div className='w-full bg-white z-30 fixed'>
            <div className="w-full px-3 py-3 shadow-md flex justify-between items-center">
                <div className="flex gap-2">
                    <h1 className='uppercase text-3xl  font-bold tracking-wider'>Shanta</h1>
                    <div onClick={()=>setIsCollectionOpen(!isCollectionOpen)} className="flex uppercase pb-1 text-sm font-semibold tracking-wider items-end">Collection

                        <div  className="">{isCollectionOpen? <ChevronUp size={17}/> : <ChevronDown size={17}/>}</div>
                    </div>
                </div>

                <div onClick={() => setMenuOpen(!menuOpen)} className="">
                    {menuOpen ? <X /> : <Menu />}
                </div>
            </div>

            {
                menuOpen && <div className="absolute h-screen bg-white w-full">
                    <div className="flex flex-col items-center gap-4 text-sm font-semibold text-gray-500  uppercase">
                        <NavLink to='/' className="hover:text-purple-600 transition">Home</NavLink>
                        <NavLink to='/about' className="hover:text-purple-600 transition">About</NavLink>
                        <NavLink to='/contact' className="hover:text-purple-600 transition">Contact</NavLink>
                    </div>
                </div>
            }


            {
                isCollectionOpen && <div className="px-1 animate-fade-up-down opacity-0  bg-transparent">
                    <CollectionDropdown/>
                </div>
            }
        </div>

        
    )
}

export default ResponsiveNavbar