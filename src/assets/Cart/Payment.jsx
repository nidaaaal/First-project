import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../components/CartProvider'

export default function Payment() {
  const{setCart}=useContext(CartContext)
  const navigator=useNavigate()
  const handle = () => {
    setCart([])
    localStorage.removeItem("cart");
    navigator('/cart');
  };
  return (
    <div className='container'>
    <div className="flex-col justify-center items-center text-center">
      <h1 className='text-center text-green-600 font-bold'> payment successfull</h1>
      <button type='submit' onClick={handle} className='bg-red-500 text-white px-3 py-1 rounded'>back to cart</button>
    </div>
    </div>
  )
}
