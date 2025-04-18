import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const id = localStorage.getItem("loginfo");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://json-server-cn80.onrender.com/users/${id}`)
      .then((res) => setCart(res.data.cart || []))
      .catch((error) => console.error("Error fetching cart:", error));
  }, [id]);

  const addToCart = async (product) => {
    if (product.status === "Inactive") {
      toast.error("Product is no longer available");
      return;
    }

    try {
      const response = await axios.get(
        `https://json-server-cn80.onrender.com/products/${product.id}`
      );
      const productData = response.data;
      const updatedCart = [...cart];

      if (productData.stock === 0) {
        toast.error("Item out of stock");
        return;
      }

      const existingProduct = updatedCart.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        toast.success("Item added again");
      } else {
        updatedCart.push({ ...product, quantity: 1 });
        toast.success("Item added to your cart");
      }

      setCart(updatedCart);

      if (id) {
        await axios.patch(
          `https://json-server-cn80.onrender.com/products/${product.id}`,
          {
            stock: productData.stock - 1,
          }
        );

        await axios.patch(
          `https://json-server-cn80.onrender.com/users/${id}`,
          { cart: updatedCart }
        );
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
        const productData = await axios.get(
          `https://json-server-cn80.onrender.com/products/${productId}`
        );

        await axios.patch(
          `https://json-server-cn80.onrender.com/products/${productId}`,
          {
            stock: productData.data.stock + product.quantity,
          }
        );

        await axios.patch(
          `https://json-server-cn80.onrender.com/users/${id}`,
          { cart: updatedCart }
        );
      }

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const productData = await axios.get(
        `https://json-server-cn80.onrender.com/products/${productId}`
      );

      const updatedCart = cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      setCart(updatedCart);

      if (id) {
        await axios.patch(
          `https://json-server-cn80.onrender.com/products/${productId}`,
          {
            stock: productData.data.stock + 1,
          }
        );

        await axios.patch(
          `https://json-server-cn80.onrender.com/users/${id}`,
          { cart: updatedCart }
        );
      }

      toast.success("Item quantity decreased");
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      const userId=localStorage.getItem("loginfo")
      // Restore all products' stock quantities
      if (userId) {
        await Promise.all(
          cart.map(item => 
            axios.patch(`https://json-server-cn80.onrender.com/products/${item.id}`, {
              stock: item.stock + item.quantity
            })
          )
        );
        
        // Clear cart on server
        await axios.patch(`https://json-server-cn80.onrender.com/users/${userId}`, {
          cart: []
        });
      }

      // Clear local cart state
      setCart([]);
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error("Clear cart error:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `https://json-server-cn80.onrender.com/orders/${orderId}`,
        { status: newStatus }
      );

      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Status error:", error);
    }
  };
  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, decreaseQuantity,updateOrderStatus,clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};