import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Log-in/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CartScreen = () => {
  
  const { isUserAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuthenticated === false) {
      navigate("/login");
    }
  }, [isUserAuthenticated, navigate]);


  return (
    <div className='pt-16'>
      cart
    </div>
  )
}

export default CartScreen
