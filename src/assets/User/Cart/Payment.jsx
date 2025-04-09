import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { CartContext } from '../components/CartProvider';
import NavBar from '../components/NavBar';

export default function Payment() {
      const navigator=useNavigate()
      const location = useLocation();
      const{cart,setCart}=useContext(CartContext);
      const orderDetails = location.state;

      const backtocart = () => {
        setCart([])
        navigator('/cart');}
       
    
      if (!orderDetails) {
        return <div className="text-center text-red-500">No order details found.</div>;
      }
    
      return (
        <div>
          <NavBar/>
        <div className="p-6 max-w-2xl mx-auto md:mt-30">
          <h1 className="text-2xl font-bold mb-4">Order Receipt</h1>
    
          <div className="mb-6">
            <p className="text-gray-600">Order ID: {orderDetails.orderId}</p>
            <p className="text-gray-600">Payment ID: {orderDetails.paymentId}</p>
          </div>
    
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Items</h2>
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-gray-600">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">Total: ₹{orderDetails.totalAmount}</h2>
          </div>
           <div className="mt-6 text-center">
        <button
          onClick={backtocart}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Cart
        </button>
        </div>
        </div>
        </div>
      );
    };
    