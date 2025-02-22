import React, { useContext } from 'react'
import { AuthContext } from '../Log-in/AuthProvider'

const UserDetails = () => {
    const {userData} = useContext(AuthContext)
  return (
    <div>
        <h1 className='text-lg font-semibold uppercase tracking-wider'>Name: {userData.name}</h1>
        <h1 className='text-lg font-semibold uppercase tracking-wider'>Address: {userData.Address}</h1>
        <h1 className='text-lg font-semibold uppercase tracking-wider'>Phone Number: {userData.number}</h1>
        <h1 className='text-lg font-semibold uppercase tracking-wider'>Email: {userData.email}</h1>
    </div>
  )
}

export default UserDetails