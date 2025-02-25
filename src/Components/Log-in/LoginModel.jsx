import React from 'react'
import Login from './Login'
import { X } from 'lucide-react'

const LoginModel = ({ setLoginModel, LoginModel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xl z-[999]">
        {/* Close Button */}
        <div 
            className="absolute top-5 right-5 text-gray-200 cursor-pointer z-[1000]"
            onClick={() => setLoginModel(false)}
        >
            <X size={24} />
        </div>

        {/* Modal Content */}
        <div className="bg-white p-10 rounded-2xl shadow-lg relative z-[1001]">
            <Login LoginModel={LoginModel} setIsLoginModel={setLoginModel} />
        </div>
    </div>
  )
}

export default LoginModel
