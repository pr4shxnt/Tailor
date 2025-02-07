import { useState, useRef } from "react";
import axios from "axios";

const VerifyOTP = ({ email }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/verify-otp`, { email, otp: otpCode });
      alert("Registration successful! You can log in now.");
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold">Verify OTP</h2>
      <div className="flex gap-2 my-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleBackspace(index, e)}
            className="w-10 h-10 text-center text-xl border rounded focus:outline-none"
          />
        ))}
      </div>
      <button onClick={handleVerify} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Verify
      </button>
    </div>
  );
};

export default VerifyOTP;
