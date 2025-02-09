import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Log-in/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartScreen = () => {
    const { isUserAuthenticated, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!loading && isUserAuthenticated === false) {
            navigate('/login');
        }
    }, [isUserAuthenticated, loading, navigate]);

    // State Declarations
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem('sessionid'));
    const [error, setError] = useState("");

    // Fetch Cart Data
    const fetchCart = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${token}`);
            setCartItems(response.data); // Assuming response.data contains the cart items
        } catch (error) {
            setError(error.message || "An error occurred while fetching cart items");
        }
    };

    useEffect(() => {
        if (token) {
            fetchCart();
        }
    }, [token]);

    // Remove Item from Cart
    const removeItem = async (productId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart(); // Re-fetch cart after item removal
        } catch (error) {
            setError(error.message || "An error occurred while removing the item");
        }
    };

    const items = cartItems.items || []; // Ensure this is a valid array

    console.log(items);
    

    if (loading) {
        return <div className='pt-16'>Loading...</div>;
    }

    return (
        <div className='pt-20'>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                items.map((item) => (
                    <div key={item.id} className='cart-item'>
                        <p>{item.productId.name}</p>
                        <div onClick={() => removeItem(item.productId._id)} className='remove-item'>
                            Remove
                        </div>
                    </div>
                ))
            )}
            {error && <p className='error'>{error}</p>}
        </div>
    );
};

export default CartScreen;
