import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Log-in/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { parse } from 'postcss';

const CartScreen = () => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
 

  console.log("Auth status:", isUserAuthenticated);

  const [cart, setCart] = useState(null);

   const token = sessionStorage.getItem('sessionid');  // Ensure token is stored
const sessionid = token


useEffect(()=>{
  if (isUserAuthenticated === false) {
    navigate('/login');
  }
})




  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      if ( !token) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${sessionid}`, {
        });
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCart();
  }, [sessionid, token]);

  const user = localStorage.getItem('user')
  const parsedUser = JSON.parse(user);
  const userName = parsedUser ? parsedUser.name : 'Guest';
  

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.productId._id !== productId),
        totalPrice: prevCart.items
          .filter(item => item.productId._id !== productId)
          .reduce((total, item) => total + item.price * item.quantity, 0),
      }));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!cart) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="flex items-center  justify-between">      <h2 className="text-3xl font-bold mb-6">Hi, {userName}</h2>
      <div className="text-right text-xl font-bold">Total Price: ${cart.totalPrice.toFixed(2)}</div>
      </div>
      {cart.items?.length > 0 ? (
        <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cart.items.map((item) => (
            <div key={item.productId._id} className="flex flex-col md:flex-row items-center p-4 shadow-lg border rounded-lg">
              <img src={item.productId.image} alt={item.productId.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex flex-col md:flex-row justify-between flex-grow px-6">
                <div>
                  <h3 className="text-xl font-semibold">{item.productId.name}</h3>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  <p className="font-bold text-lg">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center mt-2 md:mt-0" 
                  onClick={() => removeItem(item.productId._id)}
                >
                  <Trash2 className="mr-2" /> Remove
                </button>
              </div>
            </div>
          ))}
         
        </div>
        </div>
      ) : (
        <p className="text-center text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartScreen;
