import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../Context/ContextProvider';
import OrderTracking from './OrderTracking';
import { NavLink } from 'react-router-dom';
import { Settings } from 'lucide-react';

const OrdersPage = () => {
  const { orderContainer } = useContext(Context);

  const [theme, setTheme] = useState('') 

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')  
    setTheme(storedTheme);
   }, [theme])
  

  console.log("Order Container:", orderContainer);

  return (
    <div>
      <div className='flex flex-col gap-4'>
         <div className='flex flex-col gap-5'>
          {orderContainer?.length === 0 ? (
            <p className='text-center text-gray-500'>No orders found.</p>
          ) : (
            orderContainer.map((order, index) => (
              <div key={index} className='shadow-lg shadow-tertiary p-4  '>
                <h2 className='tracking-wider uppercase flex  '>
                  <h1 className="font-light">Order Number</h1> : {order.transaction_uuid?.split('-').slice(2).join('-')}
                </h2>
                <div className="mx-5 p-3 my-3 bg-primary text-tertiary rounded">
                <div className='flex flex-col gap-2 pl-5'>
                  {order.Products?.map((item, idx) => (
                    <div key={idx} title={`Click to view ${item.id.name}'s page`} className='flex tracking-wider uppercase font-light hover:scale-105 cursor-pointer transition-all duration-700 items-center gap-2'>
                      <img
                        src={item.id.images[0]}
                        alt={item.id.name.slice(0, 8)}
                        className='h-10 w-10 object-cover shadow-md'
                      />
                      <span>{item.id.name.slice(0,10)+"..."}  x {item.quantity} </span>
                    </div>
                  ))}
                </div>
                <p className='mt-2 text-end  px-5'>Total Amount: Npr. {order.totalPrice}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                <div className="">
                <p className='flex gap-1 font-light items-center uppercase tracking-wider'> <Settings color='gold'/> Order {order?.status}</p></div>
                <div className="flex gap-2">
                <button className="py-2 px-3 bg-purple-500 text-primary  hover:bg-secondary transition duration-200">
                  <NavLink to={`/user/order/invoice/${order._id}`}>See Invoice</NavLink>
                </button>
                <button className="py-2 px-3 bg-tertiary text-primary  hover:bg-secondary transition duration-200">
                  <NavLink to={`/user/order-track/${order._id}`}>Track Order</NavLink>
                </button></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
};

export default OrdersPage;
