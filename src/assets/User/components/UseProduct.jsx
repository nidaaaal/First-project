import { useState,useEffect } from "react";
import axios from "axios";
export const useProducts = () => {
    const [product, setProducts] = useState([]);
     useEffect(()=>{
          axios.get('https://json-server-cn80.onrender.com/products').then((res)=> setProducts(res.data))
          .catch((error) => console.error("Error fetching products:", error));
        },[])
        return {product}
    }
    