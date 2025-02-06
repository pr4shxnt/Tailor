import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import loginside from "./login-side.jpg";
import { AuthContext } from "./AuthProvider";

const Login = () => {
   const { isUserAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useAuth();

  const navigate = useNavigate();
  // Check if the user is already logged in

  if (isUserAuthenticated) {
    navigate("/");
  }

  console.log("Token from useAuth:", token);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex">
        <div className="img-container h80 w-80 mr-10">
          <img className="rounded-2xl" src={loginside} alt="Login" />
        </div>
        <div className="form-box">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-sm mb-2 text-center">Login to your account</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-10">
            <input
              className="rounded-xl border bg-slate-200 border-black p-2 placeholder:text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className="rounded-xl border bg-slate-200 border-black p-2 placeholder:text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="bg-black hover:bg-zinc-900 p-2 rounded-xl text-white">
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-2">
            Don't have an account? <Link to="/register" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
