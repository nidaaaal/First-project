import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../components/UseProduct";
import { CartContext } from "../components/CartProvider";
import NavBar from "../components/NavBar";
import WishlistButton from "../components/wishbutton";
import { FaStar, FaRegStar, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const { product } = useProducts();
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const getId = product.find((x) => x.id.toString() === id);

  if (!getId) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center text-red-500 text-xl">
          404 Product Not Found
        </div>
      </div>
    );
  }

  // Generate star ratings (example - replace with actual rating if available)
  const renderStars = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col md:mt-30">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Back button */}
        <Link 
          to={`/${getId.category}`}
          className="flex items-center text-gray-600 hover:text-black mb-4 transition-colors"
        >
          <FaChevronLeft className="mr-1" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="flex flex-col items-center">

            <div className="relative w-full max-w-md">
              <img
                src={`/${getId.image}`}
                alt={getId.name}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
              <div className="absolute top-4 right-4">
                <WishlistButton product={getId} />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">{getId.name}</h1>
              
              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                  {renderStars()}
                </div>
                <span className="text-gray-500 text-sm">(24 reviews)</span>
              </div>
              
              <p className="text-gray-500 mb-4">
                {getId.colour} | {getId.category}
              </p>
              
              <p className="text-2xl md:text-3xl font-bold mb-4">₹{getId.price}</p>
              
              <p className="text-gray-700 mb-6">{getId.description}</p>
            </div>

            <div className="border-t pt-6">
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Color:</h3>
                <div className="flex gap-3">
                  {['Black', 'Gray', 'White'].map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-200'} ${color === 'Black' ? 'bg-black' : color === 'Gray' ? 'bg-gray-300' : 'bg-white'}`}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Quantity:</h3>
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 border rounded-l-lg flex items-center justify-center"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <div className="w-12 h-10 border-t border-b flex items-center justify-center">
                    {quantity}
                  </div>
                  <button 
                    className="w-10 h-10 border rounded-r-lg flex items-center justify-center"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart({ ...getId, quantity });
                }}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Product Info Section */}
        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl font-semibold mb-4">Product Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>High-quality materials</li>
                <li>Comfortable fit</li>
                <li>Durable construction</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Specifications</h4>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-medium">Material:</span> Cotton</li>
                <li><span className="font-medium">Size:</span> One Size</li>
                <li><span className="font-medium">Care:</span> Machine wash</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}