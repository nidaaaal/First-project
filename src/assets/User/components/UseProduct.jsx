import { useState,useEffect } from "react";
import axios from "axios";
export const useProducts = () => {
    const [product, setProducts] = useState([]);
     useEffect(()=>{
          axios.get('http://localhost:5000/products').then((res)=> setProducts(res.data))
          .catch((error) => console.error("Error fetching products:", error));
        },[])
        return {product}
    }
    