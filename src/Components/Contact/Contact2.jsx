import React, { useState } from 'react'

const Contact2 = () => {

  const [fullname, setFullname] = useState("")
const [email, setEmail] = useState("")
const [message, setMessage] = useState("")

const handleSubmit = async (e) => {
  e.preventDefault();
}

  return (
    <>
    
    
    <div className="form-flexbox1 flex justify-center flex-row gap-28 w-4/5 items-center p-14 mx-auto ">
        <div className="address12 list-none text-2xl gap-5 flex flex-col ">
            <li><i class="fa-solid fa-phone"></i> 980000000</li>
            <li> <i class="fa-solid fa-location-dot"></i> Kathmandu, Nepal</li>
            <li><i class="fa-regular fa-envelope"></i> tailors@shanta.com</li>
            <li></li>
        </div>
        <div className="">
            <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-3'>
                <input 

                className='rounded-xl border-1 outline-none 
                 bg-slate-200 border-black p-2 
                 placeholder:text-sm'
                  type="text" 
                  placeholder='Enter your FullName'
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}

                  />


                <input 

                className='rounded-xl border-1 outline-none
                  bg-slate-200 border-black p-2 
                  placeholder:text-sm' 
                  type="email" 
                  placeholder='Enter your e-mail' 
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}

                  />


                <textarea 
                
                className='rounded-xl border-1
                 outline-none  bg-slate-200
                  border-black p-2 
                  placeholder:text-sm' 
                  cols={30} rows={5} 
                  placeholder='Enter your message' 
                  name="" 
                  id=""
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}

                  ></textarea>


                <button className='bg-black hover:bg-zinc-900 p-2 rounded-xl text-white '>
                  Submit
                </button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Contact2
