import React, { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
import { toast } from "react-toastify";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  

  const addToCart = (product) => {
   const a=localStorage.getItem("loginfo");
   if(!a===true){
    toast.error("please login!");
  }else{
      
    setCart((prevCart) => {
      
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success("item added to cart");

  };
  }
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) 
    );
  };

  return (<div>    
    <CartContext.Provider value={{ cart,setCart, addToCart, removeFromCart, decreaseQuantity }}>
      {children}      
    </CartContext.Provider>
    </div>
  );
};