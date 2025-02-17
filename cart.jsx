

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Log-in/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2 } from "lucide-react";

const CartScreen = () => {
  const { isUserAuthenticated } = useContext(AuthContext); // Get authentication status
  const navigate = useNavigate();
  const [cart, setCart] = useState(null); // Store cart data
  const token = localStorage.getItem("sessionid"); // Get session ID from storage

  // 🛑 Redirect to login if not authenticated
  useEffect(() => {
    if (isUserAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserAuthenticated, navigate]);

  // ⏳ Wait for authentication to be checked before rendering
  if (isUserAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // 🛒 Fetch cart data from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${token}`);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [token]);

  console.log(cart);
  

  // ❌ Remove item from cart
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update cart state after removal
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.productId._id !== productId),
        totalPrice: prevCart.items
          .filter((item) => item.productId._id !== productId)
          .reduce((total, item) => total + item.price * item.quantity, 0),
      }));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // 🛑 Show message if the cart is empty
  if (!cart || !cart.items?.length) {
    return <div className="flex justify-center items-center h-screen">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
        <div className="text-right text-xl font-bold">Total Price: ${cart.totalPrice}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cart.items.map((item) => (
          <div key={item.productId._id} className="flex flex-col md:flex-row items-center p-4 shadow-lg border rounded-lg">
            <img src={item.productId.image} alt={item.productId.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex flex-col md:flex-row justify-between flex-grow px-6">
              <div>
                <h3 className="text-xl font-semibold">{item.productId.name}</h3>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
                <p className="font-bold text-lg">Total: ${item.price * item.quantity}</p>
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
  );
};

export default CartScreen;
