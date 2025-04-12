import React, { useContext } from 'react'
import { AuthContext } from '../../Log-in/AuthProvider'
import { NavLink } from 'react-router-dom';

const PreviewItems = () => {
  const { cartData, loading } = useContext(AuthContext);

  
  return (

    
    <div className='grid lg:grid-cols-3 mr-3 gap-2'>
      {
        cartData.items.map((item) => (

          <NavLink to={`/product/${item.productId._id}`} key={item._id} className="flex flex-col">
          
          <div key={item._id} className="flex flex-col">
            <div className="flex flex-col items-center">
              <div className="md:h-52 md:w-52 overflow-hidden rounded-t-lg">
              <img src={item.productId.images[0]} alt="" className="w-full h-full object-cover" /></div>
              {console.log(item.images)
              }
              <div className='flex flex-col bg-primary md:w-52 w-full p-2 rounded-b-lg'>

                <h1 className="text-lg font-semibold">{item.productId.name.slice(0,20)+"..."}</h1>
                <p className="text-sm text-gray-500">Size: {item.productId.size}</p>
                <p className="text-sm text-gray-500">Price: {item.price}</p>
              </div>
            </div>
          </div>

          </NavLink>
        ))
      }
    </div>
  )
}

export default PreviewItems