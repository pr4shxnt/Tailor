import axios from 'axios';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const PaymentSuccess = () => {
   

    return (
        <div className="text-center flex flex-col justify-center items-center mt-10">
            <img src={logo} alt="" />
            <h2 className="text-2xl font-bold">Payment Successful ✅</h2>
            <NavLink to="/user/orders" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"> 
                Check Orders
            </NavLink>
        </div>
    );
};

export default PaymentSuccess;
