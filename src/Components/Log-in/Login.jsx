import React, { useState } from 'react';
import loginside from './login-side.jpg';
import { Link } from 'react-router-dom';

const Login = () => {

          const [username, setUsername] = useState("")
          const [password, setPassword] = useState("")
          

          const handleSubmit = async (e) => {
            e.preventDefault();
          }

          
  
  return (
    <>
      <div className="flex items-center justify-center h-screen"> 
        <div className="flex"> {/* Main container made flex */}
          <div className="img-container h80 w-80 mr-10 "> {/* Added margin-right */}
            <img className='pic-loginrounded-2xl' src={loginside} alt="Login" /> 
          </div>

          <div className="form-box "> 
            <h1 className='text-4xl font-bold'>Welcome Back</h1>
            <p className='text-sm mb-2 text-center'>login to your account</p>
            <div className="flex-col">
              
              
              <form action=""
              onSubmit={handleSubmit}
               className="flex flex-col gap-2 mt-10"
               >


                <input 
                className='rounded-xl border-1 
                 bg-slate-200 border-black 
                 p-2 placeholder:text-sm' 
                 type="email"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username" 
                  />


                <input 
                className='rounded-xl border-1
                 bg-slate-200 border-black
                  p-2 placeholder:text-sm' 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  />


                <button className='bg-black hover:bg-zinc-900 p-2 rounded-xl text-white '>
                    Login
                </button>
              </form>
             <p className='text-sm text-center mt-2'> Don't have an account? <Link to="/register" className='text-blue-500'>Sign Up</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;