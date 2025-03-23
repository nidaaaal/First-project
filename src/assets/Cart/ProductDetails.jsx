import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../components/UseProduct";
import { CartContext } from "../components/CartProvider";
import NavBar from "../components/NavBar";

export default function ProductDetails() {
  const { id } = useParams();
  const { product } = useProducts();
  const { addToCart } = useContext(CartContext);

  const getId = product.find((x) => x.id.toString() === id);
  console.log(getId);
  if (!getId) {
    return <div className="text-center text-red-500">! 404 Product Not Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto  bg-white shadow-lg rounded-lg overflow-hidden">
      <NavBar />
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mt-20">
        <div className="flex justify-center">
          <img 
            src={`/public/${getId.image}`}
            alt={getId.name} 
            className="w-[450px] h-auto rounded-lg shadow-md" 
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{getId.name}</h2>
            <p className="text-gray-500">{getId.colour} | {getId.category}</p>
            <p className="text-2xl font-bold mt-2">₹{getId.price}</p>
            <p className="mt-2">{getId.description}</p>
          </div>

          <div className="mt-5">
            <h3 className="font-semibold mb-2">Choose Color:</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-black border"></button>
              <button className="w-8 h-8 rounded-full bg-gray-300 border"></button>
              <button className="w-8 h-8 rounded-full bg-white border"></button>
            </div>

            <button
              onClick={() => addToCart(getId)}
              className="mt-5 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
