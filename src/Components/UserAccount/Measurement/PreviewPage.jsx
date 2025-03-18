import React, { useContext } from 'react'
import { Context } from '../../../Context/ContextProvider'
import { NavLink } from 'react-router-dom'
import { Pencil } from 'lucide-react'

const PreviewPage = () => {

  const { upperBodyData, lowerBodyData, additionalData } = useContext(Context)
    

  return (
    <div>
      <div className="max-w-7xl mx-auto ">
        <div className="grid md:grid-cols-1 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Upper Body Measurements</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(upperBodyData).map((key) => (
                <div className="bg-gray-50 px-3 py-3 gap-3 flex items-center rounded-lg" key={key}>
                  <h3 className="font-semibold ">{key}:</h3>
                  <p className="text-sm text-gray-600">{upperBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Lower Body Measurements</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(lowerBodyData).map((key) => (
                <div className="bg-gray-50 px-3 py-3 gap-3 flex items-center rounded-lg" key={key}>
                  <h3 className="font-semibold ">{key}</h3>
                  <p className="text-sm text-gray-600">{lowerBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Additional Measurements</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(additionalData).map((key) => (
                <div className="bg-gray-50 px-3 py-3 gap-3 flex items-center rounded-lg" key={key}>
                  <h3 className="font-semibold ">{key}</h3>
                  <p className="text-sm text-gray-600">{lowerBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <NavLink to="/user/measurement">
          <button 
                        
                        className="mt-4 px-4 py-2 w-full  text-purple-500 text-sm rounded-lg flex items-center justify-end text-center space-x-2  transition">
                        <Pencil   className="w-4 h-4" /> <span  className='hover:underline' >Click here to Edit</span>
                    </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage