import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './admin panel/AdminSidebar';
import { Menu } from 'lucide-react';
import {jwtDecode} from 'jwt-decode'; // Correct default import

const AdminPageLayout = () => {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false); // If no token, user is not authenticated
      navigate('/admin/login'); // Redirect to login page if not authenticated
    } else {
      try {
        // Decode the token (assuming it's a JWT)
        const decodedToken = jwtDecode(token);

        // Check if the token has expired
        if (decodedToken.exp * 1000 < Date.now()) {
          setIsAuthenticated(false); // If expired, log out the user
          localStorage.removeItem('token'); // Optionally remove the expired token
          navigate('/admin/login'); // Redirect to login page if token is expired
        } else {
          setIsAuthenticated(true); // Set authentication status if token is valid
        }
      } catch (error) {
        setIsAuthenticated(false); // If there's any error decoding the token, treat it as invalid
        localStorage.removeItem('token'); // Optionally remove the invalid token
        navigate('/admin/login'); // Redirect to login page if token is invalid
      }
    }
  }, [navigate]);

  // Return nothing or show a loading state if authentication is still being checked
  if (isAuthenticated === false) {
    return null; // or a loading spinner could be returned while the auth check happens
  }

  return (
    <div className="relative">
      <div className="flex gap-3 md:m-4">
        <div
          onClick={() => {
            setIsToggled(!isToggled);
          }}
          className={`${isToggled ? 'hidden' : 'fixed'} md:hidden opacity-50 bg-gray-700 p-1 rounded-full`}
        >
          <Menu />
        </div>
        <div className="absolute md:relative">
          <AdminSidebar isToggled={isToggled} setIsToggled={setIsToggled} />
        </div>
        <div className="p-4 w-full md:p-0">
        <Outlet /></div>
      </div>
    </div>
  );
};

export default AdminPageLayout;
