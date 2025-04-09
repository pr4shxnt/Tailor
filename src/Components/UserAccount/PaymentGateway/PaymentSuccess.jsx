import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { Home } from 'lucide-react';
import axios from 'axios';

const PaymentSuccess = () => {
    const location = useLocation();
    const [decodedData, setDecodedData] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user_id = localStorage.getItem('user');

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
            setLoading(true);
            try {
                // Parse the decoded data as JSON
                const parsed = JSON.parse(decodedData);
                setParsedData(parsed);
                setLoading(false); // Set loading to false once data is parsed
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [decodedData]);

    const handleCreateOrder = async () => {
        try {
            if (loading || !parsedData) return; // Ensure loading is false and parsedData is available before sending the request

            // Extract cartId from transaction_uuid (the part before the first hyphen)
            const cartId = parsedData.transaction_uuid.split('-')[0];

            // Prepare the data for the API request
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/order`, {
                data: parsedData, 
                cartId: cartId,  // Send the extracted cartId to the backend
                user_id: user_id
            });

            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            const data = response.data; // Assuming the response data contains the result
            console.log('Order created successfully:', data);

        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    useEffect(() => {
        if (parsedData && !loading) {
            handleCreateOrder(); // Call handleCreateOrder only when parsedData is ready and loading is false
        }
    }, [parsedData, loading]); // Run effect when parsedData or loading changes

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
