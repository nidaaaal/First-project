// Cart.js
import React, { useContext } from "react";
import { CartContext } from "../components/CartProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Cart() {
  const { cart, removeFromCart, decreaseQuantity, addToCart } = useContext(CartContext);
  const navigator=useNavigate()

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-2xl mx-auto">
         <NavBar/>

      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <h1 className="text-center text-gray-500">No products in cart</h1>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">₹{item.price}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => addToCart(item)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      
      {cart.length > 0 ?(
        <div className="flex-col justify-center items-center text-center">
      <h2>Checkout</h2>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={()=>navigator('/payment')} className="bg-green-500 text-white px-3 py-1 rounded"> PAY NOW </button></div>):
      <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={()=>navigator('/')}>Back to home</button> }
    </div>
  
  );
}