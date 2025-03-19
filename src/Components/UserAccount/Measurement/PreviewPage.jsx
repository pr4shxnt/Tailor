import React, { useContext, useState } from 'react'
import { Context } from '../../../Context/ContextProvider'
import { NavLink } from 'react-router-dom'
import { Pencil } from 'lucide-react'

const ConfirmationPage = () => {

  const { upperBodyData, lowerBodyData, additionalData, saveMeasurement } = useContext(Context)
    const [loading, setLoading] = useState(false); 
      const [error, setError] = useState("");
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
          await saveMeasurement();
          alert("Measurements saved successfully!");
        } catch (err) {
          setError("Error saving measurements. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };


  return (
    <div>
      <div className=" mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-12 ">
          <div>
            <h2 className="text-3xl font-bold mb-6">Upper Body Measurements</h2>
            <div className="grid  grid-cols-1  gap-2">
              {Object.keys(upperBodyData).map((key) => (
                <div className=" p-2 md:p-3 flex items-center gap-3 rounded-lg" key={key}>
                  <h3 className="font-semibold ">{key}:</h3>
                  <p className="text-sm text-gray-600">{upperBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Lower Body Measurements</h2>
            <div className="grid grid-cols-1  gap-2">
              {Object.keys(lowerBodyData).map((key) => (
                <div className=" p-2 md:p-3 flex items-center gap-3 rounded-lg" key={key}>
                  <h3 className="font-semibold ">{key}</h3>
                  <p className="text-sm text-gray-600">{lowerBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Additional Measurements</h2>
            <div className="grid grid-cols-1  gap-2">
              {Object.keys(additionalData).map((key) => (
                <div className="p-2 md:p-3 flex items-center gap-3 rounded-lg" key={key}>
                  <h3 className="font-semibold ">{key}</h3>
                  <p className="text-sm text-gray-600">{lowerBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <NavLink to="/user/measurement">
          <button 
                        
                        className="mt-4 px-4 py-2 w-full  text-purple-500 text-sm rounded-lg flex items-center justify-end text-center space-x-2  transition">
                        <Pencil  className="w-4 h-4" /> <span  className='hover:underline' >Click here to Edit</span>
                    </button>
          </NavLink>
    </div>
  )
}

export default ConfirmationPage