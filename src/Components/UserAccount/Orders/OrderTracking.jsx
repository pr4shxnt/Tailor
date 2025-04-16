import React, { useEffect, useState } from 'react';
import {
  PackageCheck,
  Box,
  Truck,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/${orderId}`
      );
      setOrderDetails(response.data); // assuming response.data is an array with one order object
      console.log('Fetched Order:', response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const orderStatus = [
    'Created',
    'Packed',
    'Patched',
    'On Delivery',
    'Delivered',
    'Failed',
    'Retrying'
  ];

  const statusIcons = {
    Created: <Box className="text-second-primary" />,
    Packed: <PackageCheck className="text-second-primary" />,
    Patched: <PackageCheck className="text-second-primary" />,
    'On Delivery': <Truck className="text-second-primary" />,
    Delivered: <CheckCircle className="text-second-primary" />,
    Failed: <XCircle className="text-second-primary" />,
    Retrying: <RotateCcw className="text-second-primary" />
  };

  const getStatusIndex = (status) => orderStatus.indexOf(status);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {orderDetails.length > 0 && (() => {
        const order = orderDetails[0];

        return (
          <div key={order._id} className="rounded-md p-4 shadow-md space-y-6">
            {/* Order Status */}
            <div>
              <h3 className="font-semibold mb-5 text-xl">Order Id : {order.transaction_uuid?.split('-').slice(2).join('-')}</h3>
              <div className="flex items-center justify-between relative">
                {orderStatus.slice(0, 5).map((status, idx) => {
                  const isActive = idx <= getStatusIndex(order.status);
                  return (
                    <div key={status} className="flex flex-col items-center text-center flex-1 relative">
                      <div className={`rounded-full p-2 ${isActive ? 'bg-tertiary' : 'bg-gray-300'}`}>
                        {statusIcons[status]}
                      </div>
                      <span className={`mt-1 text-sm ${isActive ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                        {status}
                      </span>
                      {idx < orderStatus.length - 1 && (
                        <div className={`absolute -top-2 h-1 w-full ${isActive ? 'bg-tertiary' : 'bg-primary'}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold text-xl">Products</h3>
              <div className="flex gap-4 mt-2 flex-wrap">
                {order.Products.map((product, idx) => (
                  <div key={idx} className="flex flex-col items-center border p-3 rounded-md w-36">
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
                      {product?.id?.images?.[0] ? (
                        <img
                          src={product.id.images[0]}
                          alt={product.id.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-sm text-gray-400">No image</span>
                      )}
                    </div>
                    <span className="text-xs mt-2 font-medium text-center">{product.id.name}</span>
                    <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
                    <span className="text-sm text-gray-500">Price: Npr. {product.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="font-semibold text-xl">Payment Info</h3>
              <p>Via: {order.PaymentStatus}</p>
              <p>Transaction Code: {order.transaction_code || 'COD'}</p>
              <p>Total: Npr. {order.totalPrice}</p>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default OrderTracking;
