import React, { useContext } from 'react'
import { Context } from '../../../Context/ContextProvider'

const PreviewPage = () => {

  const { upperBodyData, lowerBodyData, additionalData } = useContext(Context)
    

  return (
    <div>
      <div className="max-w-7xl mx-auto py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Upper Body Measurements</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(upperBodyData).map((key) => (
                <div className="bg-gray-50 p-6 rounded-lg" key={key}>
                  <h3 className="font-semibold mb-2">{key}</h3>
                  <p className="text-sm text-gray-600">{upperBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Lower Body Measurements</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(lowerBodyData).map((key) => (
                <div className="bg-gray-50 p-6 rounded-lg" key={key}>
                  <h3 className="font-semibold mb-2">{key}</h3>
                  <p className="text-sm text-gray-600">{lowerBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Additional Measurements</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(additionalData).map((key) => (
                <div className="bg-gray-50 p-6 rounded-lg" key={key}>
                  <h3 className="font-semibold mb-2">{key}</h3>
                  <p className="text-sm text-gray-600">{lowerBodyData[key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewPage