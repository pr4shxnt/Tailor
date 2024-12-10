import React, { useState } from 'react';
import loginside from '../Log-in/login-side.jpg';
import { Link, unstable_HistoryRouter } from 'react-router-dom';

const Register = () => {


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [date, setDate] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex"> {/* Main container made flex */}
          <div className="img-container h80 w-80 mr-10 justify-center items-center"> {/* Added margin-right */}
            <img className='pic-login rounded-2xl' src={loginside} alt="Login" />
          </div>

          <div className="form-box ">
            <h1 className='text-4xl font-bold '>Welcome, Join Us </h1>
            <p className='text-sm mb-2 text-center'>Create a new account</p>
            <div className="flex-col">
              <form onChange={handleSubmit} action="" className="flex flex-col gap-1.5 mt-5">
                <input value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-xl border-1  bg-slate-200 border-black p-2 placeholder:text-sm' type="email" placeholder="enter your email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-xl border-1 bg-slate-200 border-black p-2 placeholder:text-sm' type="password" placeholder="enter new Password" />
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='rounded-xl border-1 bg-slate-200 border-black p-2 placeholder:text-sm' type="password" placeholder="re-enter new Password" />
                <input value={date} onChange={(e) => setDate(e.target.value)} className='rounded-xl border-1 bg-slate-200 border-black p-2 placeholder:text-sm' type="date"  />
                <button className='bg-black hover:bg-zinc-900 p-2 rounded-xl text-white '>
                    Register
                </button>
              </form>
             <p className='text-sm text-center mt-2'> Already have an account? <Link to="/login" className='text-blue-500'>Log in</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
