import React, { useEffect, useState } from 'react';
import { Heart, Home, Scroll, Search, ShoppingCart, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import CollectionDropdown from '../Dropdown/CollectionDropdown';
import ThemeToggle from '../Cards/ThemeToggle';

const Navbar = () => {

        const [isScrollTriggered, setIsScrollTriggered] = useState(false);
        useEffect(() => {
            const handleScroll = () => {
              if (window.scrollY > 100) {
                setIsScrollTriggered(true);
              } else {
                setIsScrollTriggered(false);
              }
            };
        
            window.addEventListener("scroll", handleScroll);
            return () => {
              window.removeEventListener("scroll", handleScroll);
            };
          }, []);

    return (
        <div className="z-[100] w-full fixed animate-fade-up-down opacity-0 animation-delay-300">
            <div className={`container ${isScrollTriggered? "bg-gray-100 transition-all ease-in-out duration-500 shadow-2xl" : "transition-all ease-in-out duration-500"} mx-auto px-10`}>
                <div className="flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center gap-6">
                        <NavLink to='/' className="text-3xl py-4 font-bold uppercase tracking-wider text-gray-700 hover:text-gray-500 transition-all duration-300">
                            Shanta
                        </NavLink>
                        
                        {/* Collections Dropdown */}
                        <div className="group pt-6 pb-4 h-full relative">
                            <NavLink to='/category/all_collection' className='text-xs font-semibold tracking-wider uppercase text-gray-700 hover:text-purple-600 transition'>
                                Collections
                            </NavLink>
                            <div className="hidden fixed left-0 right-0 w-full group-hover:flex top-16">
                                <CollectionDropdown />
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-96">
                            <input type="text" placeholder='Search...' className='bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 px-4 py-2 pl-10 w-full rounded-full' />
                            <div className="absolute top-2 left-3 text-purple-600">
                                <Search size={20} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 text-sm font-semibold text-gray-500  uppercase">
                            <NavLink to='/' className="hover:text-purple-600 transition">Home</NavLink>
                            <NavLink to='/about' className="hover:text-purple-600 transition">About</NavLink>
                            <NavLink to='/contact' className="hover:text-purple-600 transition">Contact</NavLink>
                        </div>
                        
                        {/* Separator */}
        
                        <div className="w-1 min-w-[1.5px] rounded-full bg-black h-8"></div>

                        {/* Wishlist */}
                        <NavLink to='/user/account' className="group flex items-center">
                           
                                <User size={24} className="text-purple-600 transition" />
                               
                         
                        </NavLink>

                        {/* Cart */}
                        <NavLink to='/user/cart' className="w-full">
                            
                            <ShoppingCart/>
                            
                            
                        </NavLink>

                       <ThemeToggle/>

                        {/* Profile */}
                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;