import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../Log-in/AuthProvider';
import "./userSidebar.css"
import { X, ListOrdered, Heart, ShoppingCart, UserCircle2, UnfoldVerticalIcon, Settings, MessageCircleQuestion, LogOutIcon, BookCopy } from 'lucide-react';

const UserSidebar = ({ isResponsive, setIsResponsive }) => {
  const { logout } = useAuth();
  const { userData } = useContext(AuthContext);

   const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    else return "Good Evening";
  };

  // Check if the current path is one of the specified paths
  


  return (
    <div className={`${isResponsive ? 'fixed left-0 animate-fade-left-right' : 'hidden '} md:block bg-primary
     z-20`}>
      <div className="relative  ">
        <div className="w-64 h-full">
          {/* Close button for responsive sidebar */}
          <div className="absolute md:hidden top-4 right-4 cursor-pointer" onClick={() => setIsResponsive(false)}>
            <X />
          </div>
       
          <div className="flex flex-col pt-5 p-4 space-y-4">
            <div className="flex pt-4 font-light flex-col space-y-4">
              <p className="text-xs uppercase font-bold ">Shopping and Cart</p>
            <NavLink to="/user/orders" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:"><div className=""><ListOrdered size={28}  /> </div> Orders</NavLink>
            <NavLink to="/user/wishlist" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:"><div className=""> <Heart size={28}  /> </div> Wish List</NavLink>
            <NavLink to="/user/cart" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:"> <div className=""><ShoppingCart  size={28}  /></div> Cart</NavLink>
            <NavLink to="/user/account" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:"> <div className=""><UserCircle2  size={28}  /></div> Account</NavLink>
            <NavLink to="/user/measurement" className="px-4 flex gap-4 py-2 border-b-second-secondary hover:"> <div className=""><UnfoldVerticalIcon size={28}  /></div> Edit Measurement</NavLink>
            </div>

            <div className="flex flex-col font-light pt-5 space-y-4">
            <p className="text-xs uppercase font-bold">Settings and Privacy</p>
            <NavLink to="/settings" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:"> <div className=""><Settings size={28}  /></div>Settings</NavLink>
           </div>
            {/* Logout button */}
            <button onClick={logout} className="px-4 py-2 flex gap-4 text-red-500 border-b-[0.5px] border-b-second-secondary hover:scale-105 text-left">
              <LogOutIcon/>
              Logout
            </button>

       

            <div className="flex flex-col font-light pt-5 space-y-4">
            <p className="text-xs uppercase font-bold">Customer Care</p>
            <NavLink to="/help" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:"> <div className=""><MessageCircleQuestion size={28}  /></div> Help & Support</NavLink>
            </div>
          

            <NavLink to="/terms" className="px-4 flex gap-4 py-2  border-b-second-secondary hover:"> <div className=""><BookCopy  size={28}  /></div> Terms & Conditions</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
