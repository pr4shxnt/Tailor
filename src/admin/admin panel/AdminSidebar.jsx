import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

// Importing icons from Lucide React
import {
  X,
  Menu,
  Home,
  Settings,
  Users,
  GalleryHorizontal,
  Paperclip,
  UsersIcon,
  LogOut,
  LucideUniversity,
  Laptop2,
  UserCogIcon,
  Newspaper,
  Stars,
} from "lucide-react";

// Importing NavLink from React Router DOM
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ isToggled, setIsToggled }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state for logout confirmation
  const [adminUsername, setAdminUsername] = useState(""); // State to store admin username
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleMobileSidebar = () => {
    setIsToggled(!isToggled);
  };

  const handleLogout = () => {
    setShowModal(true); // Show logout confirmation modal
  };

  const confirmLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to login page
  };

  const cancelLogout = () => {
    setShowModal(false); // Close modal without logging out
  };

  return (
    <div
      className={`${
        isToggled ? "block" : "hidden"
      } md:block md:relative md:rounded-lg fixed ${
        isMinimized ? "w-20" : "w-64"
      } p-4  bg-gray-900  text-white`}
    >
      {/* Desktop view header */}
      <div
        className={`hidden md:flex w-full  items-center text-center mb-10 ${
          isMinimized ? "justify-center" : "justify-between"
        }`}
      >
        <h1>
          {isMinimized ? (
            ""
          ) : (
            <div className="flex gap-1">
              <img
                src="https://krishnapranami.org/assets/front/images/pranam_logo.png"
                className="w-20"
                alt=""
              />
            </div>
          )}
        </h1>
        <div onClick={toggleSidebar} className="cursor-pointer">
          {isMinimized ? <Menu /> : <X />}
        </div>
      </div>

      {/* Mobile view header */}
      <div
        className={`md:hidden w-full  flex justify-between items-center text-center`}
      >
        <h1>
          <img
            src="https://krishnapranami.org/assets/front/images/pranam_logo.png"
            className="w-20"
            alt=""
          />
        </h1>
        <div onClick={toggleMobileSidebar} className="cursor-pointer">
          <X />
        </div>
      </div>

      {/* Sidebar items */}
      <ul className="sidebar-items h-[82vh] md:h-full overflow-auto flex flex-col gap-6 mt-8">
        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="dashboard"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5 "
            }`}
          >
            <Home className="icon text-xl" />
            {!isMinimized && <span>Dashboard</span>}
          </li>
        </NavLink>
        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="settings"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5 "
            }`}
          >
            <Settings className="icon text-xl" />
            {!isMinimized && <span>Admin Settings</span>}
          </li>
        </NavLink>
        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="gallery"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5"
            }`}
          >
            <GalleryHorizontal />
            {!isMinimized && <span>Gallery</span>}
          </li>
        </NavLink>
        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="staff"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5 "
            }`}
          >
            <Users className="icon text-xl" />
            {!isMinimized && <span>Staffs</span>}
          </li>
        </NavLink>

        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="events"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5"
            }`}
          >
            <LucideUniversity />
            {!isMinimized && <span>Events</span>}
          </li>
        </NavLink>

        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="students"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5"
            }`}
          >
            <UserCogIcon />
            {!isMinimized && <span>Students</span>}
          </li>
        </NavLink>

        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="blogs/reviewed"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5"
            }`}
          >
            <Newspaper />
            {!isMinimized && <span>Reviewed Blogs</span>}
          </li>
        </NavLink>
        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="blogs/pending"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5"
            }`}
          >
            <Newspaper />
            {!isMinimized && <span>Pending Blogs</span>}
          </li>
        </NavLink>
        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="testimonials"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5"
            }`}
          >
            <Stars />
            {!isMinimized && <span>Testimonials</span>}
          </li>
        </NavLink>

        <NavLink
          className="sidecomp hover:bg-[#EB8F41] hover:bg-opacity-80 hover:text-white rounded-lg transition-all"
          to="/"
        >
          <li
            className={`flex items-center space-x-4  py-3 cursor-pointer  ${
              isMinimized ? "justify-center flex" : "px-5"
            }`}
          >
            <Laptop2 />
            {!isMinimized && <span>Landing page</span>}
          </li>
        </NavLink>

        {/* Logout Item */}
        <li
          onClick={handleLogout}
          className={`flex items-center space-x-4 transition-all duration-500 hover:text-[#EB8F41] py-3 cursor-pointer  ${
            isMinimized ? "justify-center flex" : "px-5"
          }`}
        >
          <LogOut className="icon text-xl" />
          {!isMinimized && <span>Logout</span>}
        </li>
      </ul>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h3 className="text-lg text-gray-600 font-semibold mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Log Out
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
