import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Log-in/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Trash2 } from "lucide-react";

const CartScreen = () => {
  const { isUserAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("sessionid");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (!loading && isUserAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserAuthenticated, loading, navigate]);

  if (isUserAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  useEffect(() => {
    const loadCart = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${token}`);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Failed to load cart. Please try again later.");
      } finally {
        setCartLoading(false);
      }
    };

    loadCart();
  }, [token]);

  const removeItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prevCart) => {
        const updatedItems = prevCart.items.filter((item) => item.productId._id !== productId);
        return {
          ...prevCart,
          items: updatedItems,
          totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
        };
      });
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="container mx-auto "> 
      <div className="flex w-full justify-between mb-3">
        <div className=""> <h2 className="text-3xl text-center font-bold mb-6">Your Cart</h2></div>
        <div className="text-right text-xl bg-gray-600 rounded px-3 py-1 text-white font-bold">
          Checkout <p className="font-light text-xs lowercase">NPR. {cart && cart.items.length > 0 ? cart.totalPrice : "Add items to cart"}</p>
        </div>
      </div>

      {cartLoading ? (
        <div className="flex justify-center items-center h-screen">Loading cart...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : cart && cart.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {cart.items.map((item) => (
            <div key={item.productId._id} className="flex w-full md:w-auto flex-row items-center shadow-2xl border rounded-lg">
              <img src={`${import.meta.env.VITE_IMAGES}/${item.productId.images[0]}`} alt={item.productId.name} className="w-28 h-28 object-cover" />
              <div className="flex flex-col md:flex-row justify-between flex-grow px-4 md:gap-6">
                <div>
                  <h3 className=" text-lg md:text-xl font-semibold">{item.productId.name.slice(0,13) + ".."} (x {item.quantity})</h3>
                  <p className="text-gray-600 text-xs md:text-sm">NPR {item.price} x {item.quantity} = NPR {item.price * item.quantity}</p>
                  <NavLink to={`/product/${item.productId._id}`}>
                    <button className="text-blue-500 text-sm font-light hover:underline">View Product</button>
                  </NavLink>
                </div>
                <button
                  className=" rounded-full text-red-500 hover:text-red-300 transition"
                  onClick={() => setConfirmDelete(item.productId._id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">Your cart is empty.</div>
      )}
      
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
