import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import CollectionDropdown from '../Dropdown/CollectionDropdown';
import ProfileDrop from './ProfileDrop';

const Navbar1 = () => {
    return (
        <div className="fixed z-[100] w-full bg-white shadow-md">
            <div className="container mx-auto px-10 ">
                <div className="flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center gap-6">
                        <NavLink to='/' className="text-3xl py-4 font-bold uppercase tracking-wider  hover:text-purple-500 transition">
                            Shanta
                        </NavLink>
                        
                        {/* Collections Dropdown */}
                        <div className="group pt-4 h-full relative">
                            <NavLink to='/category/all_collection' className='text-sm  font-semibold tracking-wider uppercase text-gray-700 hover:text-purple-600 transition'>
                                Collections
                            </NavLink>
                            <div className="absolute flex w-full justify-center  top-11 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 26 13" fill="none">
                                    <path d="M13 0L25.1244 12.75H0.875645L13 0Z" fill="currentColor" />
                                </svg>
                            </div>
                            <div className="hidden fixed left-0 right-0 w-full group-hover:flex top-16">
                                <CollectionDropdown />
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-80">
                            <input type="text" placeholder='Search...' className='bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 px-4 py-2 pl-10 w-full rounded-full' />
                            <div className="absolute top-2 left-3 text-purple-600">
                                <Search size={20} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 text-sm font-semibold uppercase">
                            <NavLink to='/about' className="hover:text-purple-600 transition">About</NavLink>
                            <NavLink to='/contact' className="hover:text-purple-600 transition">Contact</NavLink>
                        </div>
                        
                        {/* Separator */}
                        <div className="h-8 w-0.5 bg-gray-300"></div>
                        
                        {/* Profile */}
                        <div className="relative group flex items-center gap-2 px-4 py-2 border border-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition">
                            <User size={24} className="text-purple-600 group-hover:text-white" />
                            <span className='text-lg font-medium'>Profile</span>
                            <div className="absolute hidden group-hover:flex top-14 right-0">
                                <ProfileDrop />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar1;
