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
        <div className="w-64 h-full  p-4">
          {/* Close button for responsive sidebar */}
          <div className="absolute md:hidden top-4 right-4 cursor-pointer" onClick={() => setIsResponsive(false)}>
            <X />
          </div>
          <div className="flex items-center gap-3 py-3 pb-5"><img src="https://imgs.search.brave.com/Lb0XX94isOAALv_dg_l-z-cdwKwxVHYK8WI4MUirYTg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvcHJl/dmlld3MvMDQ3Lzcz/My82ODIvbm9uXzJ4/L2dyZXktYXZhdGFy/LWljb24tdXNlci1h/dmF0YXItcGhvdG8t/aWNvbi1zb2NpYWwt/bWVkaWEtdXNlci1p/Y29uLXZlY3Rvci5q/cGc" alt="" className='h-10 w-10 rounded-full'/>
          <div className="flex flex-col">
            <div className="font-bold text-xl">Hi, <span><span className='text-purple-500'>
            {userData?.name?.split(' ').slice(0, -1).join(' ')}
          </span>
          </span></div>
          <h1 className="text-xs tracking-wider">{getGreeting()+"❤️"}</h1>
          </div>
          
</div>
          <div className="flex flex-col pt-7 md:pt-0 space-y-4">
            <NavLink to="/user/orders" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"><ListOrdered size={26} color='rgb(168 85 247)' /> Orders</NavLink>
            <NavLink to="/user/wishlist" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"> <Heart size={26} color='rgb(168 85 247)' /> Wish List</NavLink>
            <NavLink to="/user/cart" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"><ShoppingCart  size={26} color='rgb(168 85 247)' /> Cart</NavLink>
            <NavLink to="/user/account" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"><UserCircle2  size={26} color='rgb(168 85 247)' /> Account</NavLink>
            <NavLink to="/user/measurement" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"><UnfoldVerticalIcon size={26} color='rgb(168 85 247)' /> Edit Measurement</NavLink>

            <NavLink to="/settings" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"><Settings size={26} color='rgb(168 85 247)' />Settings</NavLink>
            <NavLink to="/help" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"><MessageCircleQuestion size={26} color='rgb(168 85 247)' /> Help & Support</NavLink>
           
            {/* Logout button */}
            <button onClick={logout} className="px-4 py-2 flex gap-2 text-red-500 rounded-lg hover:bg-red-100 text-left">
              <LogOutIcon/>
              Logout
            </button>

            <NavLink to="/terms" className="px-4 flex gap-2 py-2 rounded-lg hover:bg-secondary"><BookCopy  size={26} color='rgb(168 85 247)' /> Terms & Conditions</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
