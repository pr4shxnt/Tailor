import { useState } from "react";
import axios from "axios";

const VerifyOTP = ({ email }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/verify-otp`, { email, otp });
      alert("Registration successful! You can log in now.");
      window.location.href = "/login"; // Redirect to login
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input type="text" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} required />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default VerifyOTP;
