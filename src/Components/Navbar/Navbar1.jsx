import React from 'react';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import CollectionDropdown from '../Dropdown/CollectionDropdown';

const Navbar1 = () => {
    return (
        <div className="z-[100] w-full fixed ">
            <div className="container mx-auto px-10">
                <div className="flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center gap-6">
                        <NavLink to='/' className="text-3xl py-4 font-bold uppercase tracking-wider hover:text-purple-500 transition">
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
                        <div className="relative w-80">
                            <input type="text" placeholder='Search...' className='bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 px-4 py-2 pl-10 w-full rounded-full' />
                            <div className="absolute top-2 left-3 text-purple-600">
                                <Search size={20} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 text-sm font-semibold uppercase">
                            <NavLink to='/' className="hover:text-purple-600 transition">Home</NavLink>
                            <NavLink to='/about' className="hover:text-purple-600 transition">About</NavLink>
                            <NavLink to='/contact' className="hover:text-purple-600 transition">Contact</NavLink>
                        </div>
                        
                        {/* Separator */}
                        <div className="h-8 w-0.5 bg-gray-300"></div>

                        {/* Wishlist */}
                        <NavLink to='/wishlist' className="group flex items-center">
                            <div className="relative flex items-center overflow-hidden">
                                <Heart size={24} className="text-purple-600 transition" />
                                <span className="ml-0 w-0 opacity-0 group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 transition-all duration-700 ease-in-out text-sm text-gray-700 bg-white">
                                    Wishlist
                                </span>
                            </div>
                        </NavLink>

                        {/* Cart */}
                        <NavLink to='/cart' className="group flex items-center">
                            <div className="relative flex items-center overflow-hidden">
                                <ShoppingCart size={24} className="text-purple-600 transition" />
                                <span className="ml-0 w-0 opacity-0 group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 transition-all duration-700 ease-in-out text-sm text-gray-700 bg-white">
                                    Cart
                                </span>
                            </div>
                        </NavLink>

                        {/* Profile */}
                        <NavLink to='/profile' className="group flex items-center">
                            <div className="relative flex items-center overflow-hidden">
                                <User size={24} className="text-purple-600 transition" />
                                <span className="ml-0 w-0 opacity-0 group-hover:ml-2 group-hover:w-auto group-hover:opacity-100 transition-all duration-700 ease-in-out text-sm text-gray-700 bg-white">
                                    Profile
                                </span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar1;
