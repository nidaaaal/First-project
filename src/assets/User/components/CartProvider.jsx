import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const id = localStorage.getItem("loginfo");


  useEffect(() => {
    async function cartadd(){
    if (!id) return;

  const res= await axios.get(`http://localhost:5000/users/${id}`)
      setCart(res.data.cart || [])
      }
    cartadd();
  }, [id]);

  const addToCart = async (product) => {
      if(product.status==="Inactive"){
        toast.error('product is no longer available')
        return;
      }
    try {
      const response = await axios.get(`http://localhost:5000/products/${product.id}`);
      const productData = response.data;
      const updatedCart = [...cart];
      
      if (productData.stock===0) {
        toast.error("Item out of stock");
        return;
      }
      const existingProduct = updatedCart.find((item) => item.id === product.id);
      if (existingProduct) {
        
        existingProduct.quantity += 1;
        toast.success("Item added again");

      } else {
        if (productData.stock === 0) {
          toast.error("Item out of stock");
          return;
        }
        updatedCart.push({ ...product, quantity: 1 });
        toast.success("Item added to your cart");

      }

      setCart([...updatedCart]);
            if (id) {
      await axios.patch(`http://localhost:5000/products/${product.id}`, {
        stock: productData.stock - 1
      });}

      if (id) {
        await axios.patch(`http://localhost:5000/users/${id}`, { cart: updatedCart });
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const product = cart.find((item) => item.id === productId); 
      if (!product) return; 
  
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
  
      if (id) {
        const productData = await axios.get(`http://localhost:5000/products/${productId}`);
  
        await axios.patch(`http://localhost:5000/products/${productId}`, {
          stock: productData.data.stock + product.quantity, 
        });
  
        await axios.patch(`http://localhost:5000/users/${id}`, { cart: updatedCart });
      }
  
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };
  
  const decreaseQuantity = async (productId) => {
    try {
      const productData = await axios.get(`http://localhost:5000/products/${productId}`);
      
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0);
  
      setCart(updatedCart);
  
      if (id) {
        await axios.patch(`http://localhost:5000/products/${productId}`, {
          stock: productData.data.stock + 1, // Restore stock when quantity decreases
        });
  
        await axios.patch(`http://localhost:5000/users/${id}`, { cart: updatedCart });
      }
  
      toast.success("Item quantity decreased");
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };
  

  return (
    <CartContext.Provider value={{ cart,setCart, addToCart, removeFromCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
