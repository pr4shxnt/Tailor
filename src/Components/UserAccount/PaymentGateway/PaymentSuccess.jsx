import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { Home } from 'lucide-react';

const PaymentSuccess = () => {
    const location = useLocation();
    const [decodedData, setDecodedData] = useState(null);
    const navigate = useNavigate();

    const isBase64 = (str) => {
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (!base64Regex.test(str)) return false;
        const padding = str.length % 4;
        if (padding === 1) return false; // Invalid Base64 length
        return true;
    };

    useEffect(() => {
        // Get the query parameter "data" from the URL
        const params = new URLSearchParams(location.search);
        const encodedData = params.get('data');

        if (encodedData) {
            if (isBase64(encodedData)) {
                try {
                    const decoded = atob(encodedData);
                    setDecodedData(decoded);   
                } catch (error) {
                    console.error('Error decoding Base64:', error);
                    navigate('/');   
                }
            } else {
                console.error('Invalid Base64 string');
                navigate('/');   
            }
        } else {
            navigate('/');  
        }
    }, [location.search, navigate]);

    useEffect(() => {
        if (decodedData) {
            try {
                // Parse the decoded data as JSON
                const parsedData = JSON.parse(decodedData);
                console.log(parsedData);  // Example: Log parsed data
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [decodedData]);

    return (
        <div className="text-center bg-second-primary flex flex-col justify-center items-center h-screen">
            <img src={logo} alt="logo" />
            <h2 className="text-2xl font-bold">Order Successful ✅</h2>
            <div className="flex gap-6">
                <NavLink to="/user/orders" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"> 
                    Check Orders
                </NavLink>
                <NavLink to="/" className="mt-4 px-4 py-2 flex gap-3 bg-tertiary text-primary rounded hover:bg-second-secondary"> 
                    <Home /> Home
                </NavLink>
            </div>
        </div>
    );
};

export default PaymentSuccess;
