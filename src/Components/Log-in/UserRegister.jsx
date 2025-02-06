import { useContext, useState } from "react";
import axios from "axios";
import VerifyOTP from "./VerifyOTP";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const {isUserAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

   if (isUserAuthenticated) {
    navigate("/");
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    DOB: "",
    number: "",
    Address: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, formData);
      alert("OTP sent to your email. Please verify.");
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="pt-16">
      <h2>Register</h2>
      {!otpSent ? (
        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="date" name="DOB" onChange={handleChange} required />
          <input type="text" name="number" placeholder="Phone Number" onChange={handleChange} required />
          <input type="text" name="Address" placeholder="Address" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
      ) : (
        <VerifyOTP email={formData.email} />
      )}
    </div>
  );
};

export default Register;
