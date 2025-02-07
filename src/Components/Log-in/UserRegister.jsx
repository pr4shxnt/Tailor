import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import VerifyOTP from "./VerifyOTP";
import { AuthContext } from "./AuthProvider";
import loginside from "./login-side.jpg";

const Register = () => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isUserAuthenticated) {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    DOB: "",
    number: "",
    Address: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, formData);
      alert("OTP sent to your email. Please verify.");
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="flex items-center pt-32 justify-center h-[80vh]">
      <div className="flex h-full items-center">
        <div className="img-container h-full w-80 mr-10">
          <img className="rounded-2xl h-full object-cover" src={loginside} alt="Register" />
        </div>
        <div className="form-box">
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-sm mb-2 text-center">Sign up to get started</p>
          {!otpSent ? (
            <form onSubmit={handleRegister} className="flex flex-col gap-2 mt-10">
              <input className="rounded-xl border bg-slate-200 border-black p-2 placeholder:text-sm" type="text" name="name" placeholder="Name" onChange={handleChange} required />
              <input className="rounded-xl border bg-slate-200 border-black p-2 placeholder:text-sm" type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <div className="relative">
                <input className="rounded-xl border bg-slate-200 border-black p-2 w-full placeholder:text-sm" type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required />
                <button type="button" className="absolute right-3 top-3 text-sm" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
              </div>
              <div className="relative">
                <input className="rounded-xl border bg-slate-200 border-black p-2 w-full placeholder:text-sm" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                <button type="button" className="absolute right-3 top-3 text-sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? "Hide" : "Show"}</button>
              </div>
              <input className="rounded-xl border bg-slate-200 border-black p-2 placeholder:text-sm" type="date" name="DOB" onChange={handleChange} required />
              <input className="rounded-xl border bg-slate-200 border-black p-2 placeholder:text-sm" type="text" name="number" placeholder="Phone Number" onChange={handleChange} required />
              <input className="rounded-xl border bg-slate-200 border-black p-2 placeholder:text-sm" type="text" name="Address" placeholder="Address" onChange={handleChange} required />
              <button className="bg-black hover:bg-zinc-900 p-2 rounded-xl text-white">Register</button>
            </form>
          ) : (
            <VerifyOTP email={formData.email} />
          )}
          <p className="text-sm text-center mt-2">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
