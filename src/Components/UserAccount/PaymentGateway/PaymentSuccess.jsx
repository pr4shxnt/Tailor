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
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const user_id = localStorage.getItem('user');

    const isBase64 = (str) => {
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (!base64Regex.test(str)) return false;
        const padding = str.length % 4;
        if (padding === 1) return false;
        return true;
    };

    useEffect(() => {
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
                 const parsed = JSON.parse(decodedData);
                setParsedData(parsed);
                setLoading(false); 
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [decodedData]);

    const handleCreateOrder = async () => {
        try {
            if (loading || !parsedData) return;  

             
            const cartId = parsedData.transaction_uuid.split('-')[0];

            
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/order`, {
                data: parsedData, 
                cartId: cartId,  
                user_id: user_id
            });



            const data = response.data; 
            console.log('Order created successfully:', data);

        } catch (error) {
            console.error('Error creating order:', error);
            setError(error.response?.data.state); // Set error message from response or fallback to error message
        }
    };

    console.log(error);
    
   useEffect(() => {
        if (error === 'unAuthorized') {
            navigate('/');
        }
    }
    , [error]); // Run effect when loading changes
    

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
