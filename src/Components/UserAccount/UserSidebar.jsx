import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { X } from 'lucide-react';

const UserSidebar = ({ isResponsive, setIsResponsive }) => {
  const { logout } = useAuth();

  return (
    <div className={`${isResponsive ? 'fixed left-0' : 'hidden'} md:block bg-gray-100 z-[500]`}>
      <div className="relative  ">
        <div className="w-64 h-full bg-gray-100 p-4 shadow-md">
          {/* Close button for responsive sidebar */}
          <div className="absolute md:hidden top-4 right-4 cursor-pointer" onClick={() => setIsResponsive(false)}>
            <X />
          </div>

          <div className="flex flex-col pt-7 md:pt-0 space-y-4">
            <NavLink to="/orders" className="px-4 py-2 rounded-lg hover:bg-gray-200">Orders</NavLink>
            <NavLink to="/user/wishlist" className="px-4 py-2 rounded-lg hover:bg-gray-200">Wish List</NavLink>
            <NavLink to="/user/cart" className="px-4 py-2 rounded-lg hover:bg-gray-200">Cart</NavLink>
            <NavLink to="/user/account" className="px-4 py-2 rounded-lg hover:bg-gray-200">Account</NavLink>
            <NavLink to="/settings" className="px-4 py-2 rounded-lg hover:bg-gray-200">Settings</NavLink>
            <NavLink to="/help" className="px-4 py-2 rounded-lg hover:bg-gray-200">Help & Support</NavLink>

            {/* Logout button */}
            <button onClick={logout} className="px-4 py-2 text-red-500 rounded-lg hover:bg-red-100 text-left">
              Logout
            </button>

            <NavLink to="/terms" className="px-4 py-2 rounded-lg hover:bg-gray-200">Terms & Conditions</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
