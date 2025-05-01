import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../Log-in/AuthProvider';
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
          <div className="flex items-center p-4 gap-3 py-3 pb-5"><img src="https://imgs.search.brave.com/Lb0XX94isOAALv_dg_l-z-cdwKwxVHYK8WI4MUirYTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDQ3Lzcz/My82ODIvbm9uXzJ4/L2dyZXktYXZhdGFy/LWljb24tdXNlci1h/dmF0YXItcGhvdG8t/aWNvbi1zb2NpYWwt/bWVkaWEtdXNlci1p/Y29uLXZlY3Rvci5q/cGc" alt="" className='h-10 w-10 rounded-full'/>
          <div className="flex flex-col">
            <div className="font-bold text-xl">Hi, <span><span className='text-purple-500'>
            {userData?.name?.split(' ').slice(0, -1).join(' ')}
          </span>
          </span></div>
          <h1 className="text-xs tracking-wider">{getGreeting()+"❤️"}</h1>
          </div>
          
</div>
          <div className="flex flex-col pt-5 p-4 border-t space-y-4">
            <div className="flex flex-col space-y-4">
              <p className="text-xs uppercase text-center">Shopping and Cart</p>
            <NavLink to="/user/orders" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"><div className=""><ListOrdered size={28}  /> </div> Orders</NavLink>
            <NavLink to="/user/wishlist" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"><div className=""> <Heart size={28}  /> </div> Wish List</NavLink>
            <NavLink to="/user/cart" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"> <div className=""><ShoppingCart  size={28}  /></div> Cart</NavLink>
            <NavLink to="/user/account" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"> <div className=""><UserCircle2  size={28}  /></div> Account</NavLink>
            <NavLink to="/user/measurement" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"> <div className=""><UnfoldVerticalIcon size={28}  /></div> Edit Measurement</NavLink>
            </div>

            <div className="flex flex-col pt-12 space-y-4">
            <p className="text-xs uppercase text-center">Shopping and Cart</p>
            <NavLink to="/settings" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"> <div className=""><Settings size={28}  /></div>Settings</NavLink>
            <NavLink to="/help" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"> <div className=""><MessageCircleQuestion size={28}  /></div> Help & Support</NavLink>
            </div>
            {/* Logout button */}
            <button onClick={logout} className="px-4 py-2 flex gap-4 text-red-500 border-b-[0.5px] border-b-second-secondary hover:bg-red-100 text-left">
              <LogOutIcon/>
              Logout
            </button>

            <NavLink to="/terms" className="px-4 flex gap-4 py-2 border-b-[0.5px] border-b-second-secondary hover:bg-secondary"> <div className=""><BookCopy  size={28}  /></div> Terms & Conditions</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
