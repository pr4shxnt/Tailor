import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CollectionDropdown from '../Dropdown/CollectionDropdown'
import ThemeToggle from '../Cards/ThemeToggle'

const ResponsiveNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isCollectionOpen, setIsCollectionOpen] = useState(false)

    return (
        <div className="w-full bg-primary text-tertiary z-30 fixed  shadow-md">
            <div className="w-full px-4 pt-4 pb-1.5 flex justify-between items-center">
                {/* Brand + Collection Dropdown */}
                <div className="flex gap-2">
                    <NavLink to='/' >
                    <h1 className="uppercase text-2xl font-bold tracking-wider">Shanta</h1>
                    </NavLink>
                    <button 
                        onClick={() => {setIsCollectionOpen(!isCollectionOpen)
                            setMenuOpen(false)
                        }} 
                        className="flex items-end pb-1 text-xs font-semibold uppercase tracking-wider"
                        aria-expanded={isCollectionOpen}
                    >
                        Collection {isCollectionOpen ? <ChevronUp size={17}/> : <ChevronDown size={17}/>}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex gap-3">
                <ThemeToggle/>
                     <button 
                    onClick={() => {setMenuOpen(!menuOpen)
                        setIsCollectionOpen(false)
                    }} 
                    className="focus:outline-none" 
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                </div>
               

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute animate-fade-up-down opacity-0 animation-delay-100 w-full h-[50vh] shadow-xl bg-second-primary text-tertiary flex flex-col items-center gap-6 pt-20 text-sm font-semibold text-gray-600 uppercase">
                    <NavLink onClick={()=>setMenuOpen(false)} to='/' className="hover:text-purple-600 transition">Home</NavLink>
                    <NavLink onClick={()=>setMenuOpen(false)} to='/about' className="hover:text-purple-600 transition">About</NavLink>
                    <NavLink onClick={()=>setMenuOpen(false)} to='/contact' className="hover:text-purple-600 transition">Contact</NavLink>
                    <NavLink onClick={()=>setMenuOpen(false)} to='/category/all_collection' className="hover:text-purple-600 transition">All Collection</NavLink>
                </div>
            )}

            {/* Collection Dropdown */}
            {isCollectionOpen && (
                <div className="absolute w-full z-50 px-1 animate-fade-up-down opacity-0 animation-delay-100">
                    <CollectionDropdown />
                </div>
            )}
        </div>
    )
}

export default ResponsiveNavbar
