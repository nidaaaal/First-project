import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "./UseProduct";
import { CartContext } from "./CartProvider";
import NavBar from "./NavBar";
export default function ProductDetails() {
  const { id } = useParams();
  const { product } = useProducts();
  const { addToCart } = useContext(CartContext);

  const getId = product.find((x) => x.id.toString() === id);

  if (!getId) {
    return <div className="text-center text-red-500">! 404 Product Not Found</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
         <NavBar/>

      <img src={`/public/${getId.image}`} alt={getId.name} className="w-full h-auto max-h-96 object-scale-down" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{getId.name}</h2>
        <p className="text-gray-500">{getId.colour} | {getId.category}</p>
        <p className="text-xl font-bold mt-2">₹{getId.price}</p>
        <p className="mt-2">{getId.description}</p>
        <button
          onClick={() => addToCart(getId)}
          className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}