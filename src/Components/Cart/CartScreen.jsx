import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Log-in/AuthProvider";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { Trash2 } from "lucide-react";

const CartScreen = () => {
  const { isUserAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] }); // Default to an empty cart
  const [cartLoading, setCartLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  console.log("CartScreen Rendered"); // Debugging Log
  console.log("Cart State:", cart); // Debugging Log
  const token = localStorage.getItem("sessionid");

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!loading && isUserAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserAuthenticated, loading, navigate]);

  // Fetch cart data
  useEffect(() => {
    const loadCart = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setCartLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/${token}`);

        setCart(response.data || { items: [] });
      } catch (error) {
        console.error("Error fetching cart data:", error.response?.data || error.message);
        setError("Failed to load cart. Please try again later.");
      } finally {
        setCartLoading(false);
      }
    };

    loadCart();
  }, [token]);

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update cart state after removal
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
    <div className="container mx-auto p-4">
      <div className="flex w-full justify-between mb-3">
        <h2 className="text-3xl font-bold">Your Cart</h2>
        <div className="text-right text-xl bg-gray-600 rounded px-3 py-1 text-white font-bold">
          <NavLink to={`/user/user-checkout`}>
          Checkout <p className="font-light text-xs lowercase">
            NPR {cart.items.length > 0 ? cart.totalPrice : "Add items to cart"}
          </p></NavLink>
        </div>
      </div>

      {/* Loading State */}
      {cartLoading && (
        <div className="flex justify-center items-center h-64">Loading cart...</div>
      )}

      {/* Error Message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Cart Items */}
      {!cartLoading && cart.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {cart.items.map((item) => (
            <div key={item.productId._id} className="flex flex-row items-center shadow-2xl shadow-second-secondary  rounded-tl-2xl">

              {/* Product Image (Fallback added) */}
              <img
                src={item.productId?.images?.[0] || "/default-image.jpg"}
                alt={item.productId?.name || "Product"}
                className="w-24 h-24 object-cover rounded-tl-2xl"
              />

              {/* Product Info */}
              <div className="flex flex-col justify-between flex-grow  px-4">
                <h3 className="text-lg font-semibold">
                  {item.productId?.name?.slice(0, 13) + "..."} (x {item.quantity})
                </h3>
                <p className="text-gray-600 text-sm">
                  NPR {item.price} x {item.quantity} = NPR {item.price * item.quantity}
                </p>
                <NavLink to={`/product/${item.productId._id}`} className="text-blue-500 text-sm hover:underline">
                  View Product
                </NavLink>
              </div>

              {/* Delete Button */}
              <button className="text-red-500 hover:text-red-300 px-4 transition" onClick={() => setConfirmDelete(item.productId._id)}>
                <Trash2 />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !cartLoading && <div className="flex justify-center items-center h-40 text-lg">Your cart is empty.</div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed top-0 left-0 w-screen h-full bg-opacity-70 backdrop-blur-sm bg-black flex justify-center items-center">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">
              Do you really wish to remove{" "}
              {cart.items.find((item) => item.productId._id === confirmDelete)?.productId.name} from your Cart?
            </p>
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={() => setConfirmDelete(null)}>
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => {
                  removeItem(confirmDelete);
                  setConfirmDelete(null);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
