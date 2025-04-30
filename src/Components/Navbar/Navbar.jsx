import React, { useContext, useEffect, useState } from 'react';
import { Heart, Home, Scroll, Search, ShoppingCart, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import CollectionDropdown from '../Dropdown/CollectionDropdown';
import ThemeToggle from '../Cards/ThemeToggle';
import DropdownUser from "../UserAccount/DropdownUser"
import { AuthContext } from '../Log-in/AuthProvider';
import SearchBar from './Search/SearchBar';
import InitialResults from './Search/InitialResults';

const Navbar = () => {
    const [isScrollTriggered, setIsScrollTriggered] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { isUserAuthenticated } = useContext(AuthContext);

    // 🔍 Search query state
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollTriggered(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="z-[100] w-full fixed animate-fade-up-down opacity-0 animation-delay-300">
            <div className={`container ${isScrollTriggered ? " bg-primary shadow-2xl" : ""} transition-all ease-in-out duration-500 mx-auto px-10`}>
                <div className="flex justify-between items-center">
                    {/* Left Section */}
                    <div className="flex items-center gap-6">
                        <NavLink to='/' className="text-3xl py-4 font-bold uppercase tracking-wider text-tertiary hover:text-gray-500 transition-all duration-300">
                            Shanta
                        </NavLink>

                        {/* Collections Dropdown */}
                        <div className="group pt-6 pb-4 h-full relative">
                            <NavLink to='/category/all_collection' className='text-xs font-semibold tracking-wider uppercase text-tertiary hover:text-purple-600 transition'>
                                Collections
                            </NavLink>
                            <div className="hidden fixed left-0 right-0 w-full group-hover:flex top-16">
                                <CollectionDropdown />
                            </div>
                        </div>

                        {/* Search Bar + Results */}
                        <div className="relative">
                            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                            {searchQuery && (
                                <div className="absolute z-50 mt-2 w-full bg-white shadow-md rounded-md">
                                    <InitialResults setQuery={setSearchQuery} query={searchQuery} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">
                        <div className="flex gap-4 text-sm font-semibold text-tertiary uppercase">
                            <NavLink to='/' className="hover:text-purple-600 transition">Home</NavLink>
                            <NavLink to='/about' className="hover:text-purple-600 transition">About</NavLink>
                            <NavLink to='/contact' className="hover:text-purple-600 transition">Contact</NavLink>
                        </div>

                        <div className="w-1 min-w-[1.5px] rounded-full bg-tertiary h-8"></div>

                        {/* User Auth */}
                        {isUserAuthenticated ? (
                            <div onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="relative flex items-center">
                                <User size={24} className="text-purple-600 transition" />
                                {isUserMenuOpen && (
                                    <div className="absolute top-12 shadow-2xl shadow-secondary -right-20">
                                        <DropdownUser />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink to='/login' className="relative flex items-center">
                                <User size={24} className="text-purple-600 transition" />
                            </NavLink>
                        )}

                        {/* Cart */}
                        <NavLink to='/user/cart'>
                            <ShoppingCart />
                        </NavLink>

                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
