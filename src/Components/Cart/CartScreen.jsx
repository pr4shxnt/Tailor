import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Log-in/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Trash2 } from "lucide-react";

const CartScreen = () => {
  const { isUserAuthenticated, loading, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("sessionid");
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && isUserAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserAuthenticated, loading, navigate]);

  // Wait for authentication check before rendering
  if (isUserAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Fetch cart data from backend
  useEffect(() => {
    const loadCart = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${token}`);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    loadCart();
  }, [token]);

  // Remove item from cart with confirmation
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update cart state
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

  // Show message if the cart is empty
  if (!cart || !cart.items?.length) {
    return <div className="flex justify-center items-center h-screen">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-6 pt-20">
       <h2 className="text-3xl text-center font-bold mb-6">Your Cart</h2>
      <div className="flex w-full justify-between">
       <div className="">{userData.name}</div>
        <div className="text-right text-xl bg-gray-600 rounded px-3 py-1 text-white font-bold">Checkout <p className="font-light text-xs lowercase">NPR. {cart.totalPrice}</p></div>
      </div>
      <div className="flex-wrap flex gap-6">
        {cart.items.map((item) => (
          <div key={item.productId._id} className="flex w-full md:w-auto flex-row items-center shadow-2xl border rounded-lg">
            <img src={`${import.meta.env.VITE_IMAGES}/${item.productId.images[0]}`} alt={item.productId.name} className="w-32 h-32 object-cover" />
            <div className="flex flex-col md:flex-row justify-between flex-grow px-6 md:gap-6">
              <div>
                <h3 className=" text-lg md:text-xl font-semibold">{item.productId.name.slice(0,13)+".."} (x {item.quantity})</h3>
                <p className="text-gray-600 text-xs md:text-sm">NPR {item.price} x {item.quantity} = NPR {item.price * item.quantity}</p>
                <NavLink to={`/product/${item.productId._id}`}>
                  <button className="text-blue-500 text-sm font-light hover:underline">View Product</button>
                </NavLink>
              </div>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition"
                onClick={() => setConfirmDelete(item.productId._id)}
              >
                <Trash2 stroke="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {confirmDelete && (
        <div className="fixed top-0 left-0 w-screen h-full bg-opacity-70 backdrop-blur-sm bg-black flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Do you really wish to remove {cart.items.find(item => item.productId._id === confirmDelete)?.productId.name} from your Cart?</p>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setConfirmDelete(null)}>No</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => { removeItem(confirmDelete); setConfirmDelete(null); }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
