import React, { useContext } from 'react';
import { Context } from '../../../Context/ContextProvider';
import OrderTracking from './OrderTracking';
import { NavLink } from 'react-router-dom';

const OrdersPage = () => {
  const { orderContainer } = useContext(Context);

  console.log("Order Container:", orderContainer);

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>My Orders</h1>
        <div className='flex flex-col gap-4'>
          {orderContainer?.length === 0 ? (
            <p className='text-center text-gray-500'>No orders found.</p>
          ) : (
            orderContainer.map((order, index) => (
              <div key={index} className='border p-4 rounded-md'>
                <h2 className='text-lg font-semibold'>
                  Order ID: {order.transaction_uuid?.split('-').slice(2).join('-')}
                </h2>
                <p>Items:</p>
                <div className='flex flex-col gap-2 pl-5'>
                  {order.Products?.map((item, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                      <img
                        src={item.id.images[0]}
                        alt={item.id.name}
                        className='h-8 w-8 object-cover rounded'
                      />
                      <span>{item.id.name} : Npr. {item.id.price} x {item.quantity} (Npr. {item.price})</span>
                    </div>
                  ))}
                </div>
                <p className='mt-2'>Total Amount: ${order.totalPrice}</p>
                <p>Status: {order.status || "Pending"}</p>
                <button className="">
                  <NavLink to={`/user/order-track/${order._id}`}>Check</NavLink>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
};

export default OrdersPage;
