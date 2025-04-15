import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../components/UseProduct";
import { CartContext } from "../components/CartProvider";
import NavBar from "../components/NavBar";
import WishlistButton from "../components/wishbutton";
import { FaStar, FaRegStar, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

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
        <div className="mt-16 md:mt-20 flex-grow "> {/* Adjusted margin-top */}
          <Loading />
        </div>
      </div>
    );
  }

  const renderStars = (rating = 4) => {
    return Array(5).fill(0).map((_, i) => (
      i < rating ? 
        <FaStar key={i} className="text-yellow-400" /> : 
        <FaRegStar key={i} className="text-yellow-400" />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Main content container with proper spacing */}
      <main className="flex-grow mt-16 md:mt-25 px-4 py-6 md:py-8"> {/* Responsive top margin */}
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Link 
            to={`/${getId.category}`}
            className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
          >
            <FaChevronLeft className="mr-1" /> Back to Products
          </Link>

          {/* Product grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
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
            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold mb-3">{getId.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars()}
                  </div>
                  <span className="text-gray-500 text-sm">(24 reviews)</span>
                </div>
                
                <p className="text-gray-500 mb-4">
                  {getId.colour} | {getId.category}
                </p>
                
                <p className="text-2xl md:text-3xl font-bold mb-5">₹{getId.price}</p>
                
                <p className="text-gray-700 mb-6">{getId.description}</p>
              </div>

              <div className="border-t pt-6 space-y-6">
                {/* Color Selection */}
                <div>
                  <h3 className="font-semibold mb-3">Color:</h3>
                  <div className="flex gap-3">
                    {['Black', 'Gray', 'White'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color ? 'border-black scale-110' : 'border-gray-200 hover:border-gray-400'
                        } ${
                          color === 'Black' ? 'bg-black' : 
                          color === 'Gray' ? 'bg-gray-300' : 'bg-white'
                        }`}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <h3 className="font-semibold mb-3">Quantity:</h3>
                  <div className="flex items-center w-fit">
                    <button 
                      className="w-10 h-10 border rounded-l-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <div className="w-12 h-10 border-t border-b flex items-center justify-center">
                      {quantity}
                    </div>
                    <button 
                      className="w-10 h-10 border rounded-r-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      onClick={() => setQuantity(quantity + 1)} disabled
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
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Additional Product Info Section */}
          <section className="mt-12 md:mt-16 border-t pt-8 md:pt-12">
            <h3 className="text-xl md:text-2xl font-semibold mb-6">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h4 className="font-medium mb-3">Features</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>High-quality materials</li>
                  <li>Comfortable fit</li>
                  <li>Durable construction</li>
                  <li>Breathable fabric</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Specifications</h4>
                <ul className="space-y-3 text-gray-700">
                  <li><span className="font-medium">Material:</span> 100% Cotton</li>
                  <li><span className="font-medium">Size:</span> One Size Fits Most</li>
                  <li><span className="font-medium">Care:</span> Machine wash cold</li>
                  <li><span className="font-medium">Weight:</span> 250g</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}