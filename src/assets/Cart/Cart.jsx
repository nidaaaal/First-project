import React, { useContext } from "react";
import { CartContext } from "../components/CartProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
export default function Cart() {
  const { cart, removeFromCart, decreaseQuantity, addToCart } = useContext(CartContext);
  const navigator=useNavigate()

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  

    const testPayment = () => {
      
      const paymentResponse = {
        paymentId: "Q9kmIRSyBF8V2u",
        orderId: "mock_order_id",
        signature: "mock_signature",
      };

      const orderDetails = {     

        items: cart,
        totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        paymentId: paymentResponse.paymentId,
        orderId: paymentResponse.orderId,
        signature: paymentResponse.signature,
      };
      toast.success("Mock Payment Successful!");
    
      console.log("Mock Payment Response:", paymentResponse);
    
      navigator('/payment' ,{ state: orderDetails });
    
    };


  return (
    <div>
               <NavBar/>

    <div className="p-6 max-w-2xl mx-auto mt-20">

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
      <p>Total: ₹{total.toFixed(2)}</p>
      <button onClick={testPayment} className="bg-green-500 text-white px-3 py-1 rounded"> PAY NOW </button></div>):
      <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={()=>navigator('/')}>Back to home</button> }
    </div>
    </div>

  );
}