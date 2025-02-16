import React from 'react'
import Login from './Login'
import { X } from 'lucide-react'

const LoginModel = ({ setLoginModel, LoginModel }) => {
  return (
    <div>
        <div className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-xl bg-opacity-50 z-50"></div>
        <div className="fixed text-gray-200 z-[999] top-0 cursor-pointer right-3 md:right-10 pt-32" onClick={() => { setLoginModel(false) }}>
            <X />
        </div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 rounded-2xl -translate-y-1/2 bg-white p-10 z-50">
            <Login LoginModel={LoginModel} setIsLoginModel={setLoginModel} />
        </div>
    </div>
  )
}

export default LoginModel
