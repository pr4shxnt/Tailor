import React from 'react'
import UserDetails from './UserDetails'
import Measurement from './Measurement'

const UserDetailsMeasurement = () => {
  return (
    <div className='flex flex-col md:flex-row w-full   min-h-full bg-gradient-to-b from-gray-300 to-gray-100 p-4'>
       <UserDetails/> 
        <Measurement/>
    </div>
  )
}

export default UserDetailsMeasurement