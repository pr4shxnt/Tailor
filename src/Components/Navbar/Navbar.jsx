import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import "./Navbar.css"
import CollectionDropdown from '../Dropdown/CollectionDropdown'
import { AuthContext } from '../Log-in/AuthProvider'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'


const Navbar = () => {
    const { isUserAuthenticated, userData } = useContext(AuthContext);
    const { logout } = useAuth();

    console.log(userData);
    
    const [visible, setVisible] = useState(false)

     



    const location = useLocation();

    const [isCollection, setIsCollection] = useState(false)
     



    useEffect(() => {
        if (location.pathname.startsWith('/category')) setIsCollection(true
        );
        else setIsCollection(false);
    }, [location]);

    const [cart, setCart] = useState([]);

    const token = sessionStorage.getItem('sessionid');  // Ensure token is stored
 const sessionid = token
 
 
 
 
 
   // Fetch cart data
   useEffect(() => {
     const fetchCart = async () => {
       if ( !token) return;
       try {
         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${sessionid}`, {
         });
         setCart(response.data);
       } catch (error) {
         console.error('Error fetching cart data:', error);
       }
     };
 
     fetchCart();
   }, []);


    

   let cartItems;

   cart.items ? cartItems = cart.items.length : "0" 



   
   return (
        <div className=" fixed flex w-full items-center  justify-between md:px-10 px-3  shadow-lg  z-[999]  bg-white  font-medium">
            <img src={assets.logo} className='w-28 py-1' alt="" />

            <div className="">
                <ul className='hidden md:flex gap-5 text-sm text-gray-700 '>
                    <NavLink to='/' className="flex py-5 flex-col items-center gap-1">
                        <p>Home</p>
                        <hr className='w-5/6 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/about' className="flex py-5 flex-col items-center gap-1">
                        <p>About</p>
                        <hr className='w-5/6 border-none h-[1.5px] transition-all duration-500 bg-gray-700 hidden' />
                    </NavLink>
                    <div className="group relative">
                        <NavLink to='/category/all_collection' className="flex py-5 flex-col items-center gap-1">
                            <p>Collection</p>
                            {/* Show the underline if isCollection is true */}
                            <div className={`w-5/6 h-[1.5px] bg-black transition-all duration-500 ${isCollection ? 'block' : 'hidden'}`} />
                        </NavLink>
                        {/* Dropdown on hover */}
                        <div className="hidden fixed left-0  right-0 w-full group-hover:flex  top-14">
                            <CollectionDropdown />
                        </div>
                    </div>

                    <NavLink to='/contact' className="flex py-5 flex-col items-center gap-1">
                        <p>Contact</p>
                        <hr className='w-5/6 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>
            </div>
            <div className="flex items-center gap-6">

                {
                    isUserAuthenticated ? <div className="group  relative">
                        <div className="flex items-center gap-2 py-2 border-black border rounded-full px-3"> <img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" /> <h1 className='hidden md:block'> {userData.name}</h1> </div>

                        <div className="group-hover:block hidden absolute dropdown-menu z-[999] right-0 pt-4">
                            <div className="flex z-[2000] flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                <p className="cursor-pointer hover:text-black">My Profile</p>
                                <p className="cursor-pointer hover:text-black">Orders</p>
                                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                            </div>
                        </div>
                    </div> : <Link to="/login" className="">  <div className="flex items-center gap-2 py-2 border-black border rounded-full px-3"> <img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" /> Login </div></Link>
                }


                <Link className='relative' to="/cart">
                    <img src={assets.cart_icon} className='w-5' alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{cartItems}</p>
                </Link>

                <img onClick={() => {
                    setVisible(true)
                }} src={assets.menu_icon} className='w-5 cursor-pointer md:hidden' alt="" />
            </div>
            {/* responsive */}
            <div className={` fixed z-[999] top-24 m-3 backdrop-blur-3xl  right-0 bottom-0 overflow-hidden   rounded-lg transition-all ${visible ? "w-[95vw]" : "w-0"}`}>
                <div className="flex flex-col text-gray-600">
                    <div className="flex cursor-pointer items-center gap-1 p-3">
                        <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
                        <p onClick={
                            () => setVisible(false)
                        } className="">Back</p>
                    </div>
                    <NavLink onClick={
                        () => setVisible(false)
                    } className="py-2 pl-6" to="/">HOME</NavLink>
                    <NavLink onClick={
                        () => setVisible(false)
                    } className="py-2 pl-6" to="/category/all_collection">COLLECTION</NavLink>
                    <NavLink onClick={
                        () => setVisible(false)
                    } className="py-2 pl-6" to="/about">ABOUT</NavLink>
                    <NavLink onClick={
                        () => setVisible(false)
                    } className="py-2 pl-6" to="/contact">CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
