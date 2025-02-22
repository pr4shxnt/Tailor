import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserSidebar = () => {
    const {logout} = useAuth()
  return (
    <div className="w-64 h-full bg-gray-100 p-4 shadow-md">
      <div className="flex flex-col space-y-4">
        <NavLink to="/orders" className="px-4 py-2 rounded-lg hover:bg-gray-200">Orders</NavLink>
        <NavLink to="/user/wishlist" className="px-4 py-2 rounded-lg hover:bg-gray-200">Wish List</NavLink>
        <NavLink to="/cart" className="px-4 py-2 rounded-lg hover:bg-gray-200">Cart</NavLink>
        <NavLink to="/user/account" className="px-4 py-2 rounded-lg hover:bg-gray-200">Account</NavLink>
        <NavLink to="/settings" className="px-4 py-2 rounded-lg hover:bg-gray-200">Settings</NavLink>
        <NavLink to="/help" className="px-4 py-2 rounded-lg hover:bg-gray-200">Help & Support</NavLink>
        <NavLink onClick={logout} className="px-4 py-2 text-red-500 rounded-lg hover:bg-red-100">Logout</NavLink>
        <NavLink to="/terms" className="px-4 py-2 rounded-lg hover:bg-gray-200">Terms & Conditions</NavLink>
      </div>
    </div>
  );
};

export default UserSidebar;
