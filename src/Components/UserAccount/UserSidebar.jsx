import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { X } from 'lucide-react';

const UserSidebar = ({ isResponsive, setIsResponsive }) => {
  const { logout } = useAuth();

  return (
    <div className={`${isResponsive ? 'fixed left-0 animate-fade-left-right' : 'hidden '} md:block bg-primary
     z-[500]`}>
      <div className="relative  ">
        <div className="w-64 h-full  p-4">
          {/* Close button for responsive sidebar */}
          <div className="absolute md:hidden top-4 right-4 cursor-pointer" onClick={() => setIsResponsive(false)}>
            <X />
          </div>

          <div className="flex flex-col pt-7 md:pt-0 space-y-4">
            <NavLink to="/orders" className="px-4 py-2 rounded-lg hover:bg-secondary">Orders</NavLink>
            <NavLink to="/user/wishlist" className="px-4 py-2 rounded-lg hover:bg-secondary">Wish List</NavLink>
            <NavLink to="/user/cart" className="px-4 py-2 rounded-lg hover:bg-secondary">Cart</NavLink>
            <NavLink to="/user/account" className="px-4 py-2 rounded-lg hover:bg-secondary">Account</NavLink>
            <NavLink to="/user/measurement" className="px-4 py-2 rounded-lg hover:bg-secondary"> Edit Measurement</NavLink>

            <NavLink to="/settings" className="px-4 py-2 rounded-lg hover:bg-secondary">Settings</NavLink>
            <NavLink to="/help" className="px-4 py-2 rounded-lg hover:bg-secondary">Help & Support</NavLink>
           
            {/* Logout button */}
            <button onClick={logout} className="px-4 py-2 text-red-500 rounded-lg hover:bg-red-100 text-left">
              Logout
            </button>

            <NavLink to="/terms" className="px-4 py-2 rounded-lg hover:bg-secondary">Terms & Conditions</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
