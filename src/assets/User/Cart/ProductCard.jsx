import React, { useContext } from "react";
import { CartContext } from "../components/CartProvider";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../animations/Pagewrapper";
import ScrollWrapper from "../animations/ScrollWrapper"
export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigator=useNavigate()

  return (
        <PageWrapper>
    
    <div className="w-full max-w-xs overflow-hidden z-1 mt-10" >
    <ScrollWrapper>

      <div className="relative w-full h-110">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onClick={()=>navigator(`/${product.category}/${product.id}`)}
        />
      </div >
      <div className="p-4" onClick={()=>navigator(`/${product.category}/${product.id}`)}>
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-xs">{product.colour}</p>
        <p className="text-lg font-bold mt-1">₹{product.price}</p>

      </div>

      <button
        className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        onClick={(e) =>{e.preventDefault() ; addToCart(product)}}
      >
        Add to Cart
      </button>
      </ScrollWrapper>
    </div>
        </PageWrapper>

  );
}