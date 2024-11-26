import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the scroll threshold (515.20...) as needed
      if (location.pathname === '/' && window.scrollY < 515.20) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed w-full z-50">
      <div className={navbar && location.pathname === '/' ? 'navbar active' : 'navbar'}>
        <nav id='activestyle' className="flex justify-between px-4 py-3 h-14 items-center text-white">
          <div>
            <Link to="/">
              <h1 className="text-xl font-bold">Tailors</h1>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-5 list-none text-sm font-semibold justify-center items-center">
            <li>
              <Link className='hover:text-gray-400 transition-all duration-300' to="/">Home</Link>
            </li>
            <li>
              <Link className='hover:text-gray-400 transition-all duration-300' to="/about">About</Link>
            </li>
            <li>
              <Link className='hover:text-gray-400 transition-all duration-300' to="/contact">Contact</Link>
            </li>
            <li>
              <Link className='hover:text-gray-400 transition-all duration-300' to="/shop">Shop</Link>
            </li>
          </div>

          <div className="hidden md:flex gap-3 items-center justify-center">
            <Link to="/cart">
              <div className="flex gap-2 items-center justify-center ">
                <i className="text-xl hover:text-gray-400  fa-solid fa-shopping-cart transition-all duration-300"></i>
              </div>
            </Link>

            <Link to="/login" className="text-sm font-semibold border-dashed border-gray-400 text-gray-400 border-2 rounded-md px-3 py-2 hover:bg-gray-400 transition-all duration-700 hover:text-black">
              <div className="flex gap-2 items-center justify-center">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <h1>Log-in</h1>
              </div>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu (Initially Hidden) */}
        <div 
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-14 left-0 w-full bg-black p-5 shadow -z-20 transition-all duration-300 ease-in-out`}
        >
          <ul className="p-5 text-white text-lg font-semibold text-center list-none">
            {/* Navigation Links */}
            <li>
              <Link to="/" className="block hover:text-gray-400 p-2" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block hover:text-gray-400 p-2" onClick={toggleMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block hover:text-gray-400 p-2" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/shop" className="block hover:text-gray-400 p-2" onClick={toggleMenu}>
                Shop
              </Link>
            </li>
          </ul>

          {/* Cart and Login Links */}
          <div className="flex flex-col gap-7 items-center justify-center mt-4 p-4">
            <Link to="/cart" onClick={toggleMenu}>
              <div className="flex gap-2 items-center justify-center ">
                <i className="damnCart text-xl fa-solid fa-shopping-cart transition-all duration-300"></i>
              </div>
            </Link>

            <Link 
              to="/login" 
              className="text-sm font-semibold border-dashed border-gray-400 text-gray-400 border-2 rounded-md px-3 py-2 hover:bg-gray-400 transition-all duration-700 hover:text-black"
              onClick={toggleMenu}
            >
              <div className="flex gap-2 items-center justify-center">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <h1>Log-in</h1>
              </div>
            </Link>

            <p className='text-white text-sm text-center'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut, deleniti!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
