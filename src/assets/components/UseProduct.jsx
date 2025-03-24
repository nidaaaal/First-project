import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import { CartContext } from "./CartProvider";
export const useProducts = () => {
    const [product, setProducts] = useState([]);
     useEffect(()=>{
          axios.get('http://localhost:5000/products').then((res)=> setProducts(res.data))
          .catch((error) => console.error("Error fetching products:", error));
        },[])
        return {product}
    }
    
   export const useCart =()=>{
    const{cart,setCart}=useContext(CartContext)
    const {id}=useParams()
    useEffect(()=>{
      axios.get(`http://localhost:5000/users/${id}/cart`).then((res)=> setCart(res.data))
      .catch((error) => console.error("Error fetching products:", error));
    },[cart]);
    console.log(cart)
   }