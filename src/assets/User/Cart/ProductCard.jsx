import React, { useContext, useRef, useEffect, useState } from "react";
import { CartContext } from "../components/CartProvider";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../animations/Pagewrapper";
import ScrollWrapper from "../animations/ScrollWrapper";
import WishlistButton from '../components/wishbutton';
import Loading from "../components/Loading";

export default function ProductCard({ product, isLoading }) {
  const { addToCart } = useContext(CartContext);
  const navigator = useNavigate();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-xs overflow-hidden z-1 mt-10">
        <div className="relative w-full h-80 bg-gray-100 rounded-lg animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading size="small" />
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse"></div>
          <div className="h-5 bg-gray-100 rounded w-1/4 mt-2 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-100 rounded-lg mt-3 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div 
      className="w-full max-w-xs overflow-hidden z-1 mt-10"
      ref={cardRef}
    >
      {isVisible ? (
        <PageWrapper>
          <ScrollWrapper>
            <div 
              className="relative w-full h-80 cursor-pointer group" 
              onClick={() => navigator(`/${product.category}/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3">
                <WishlistButton product={product} />
              </div>
              {/* Quick view overlay */}
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white font-medium  bg-opacity-70 px-3 py-1 rounded text-sm">
                  Quick View
                </span>
              </div>
            </div>
            
            <div 
              className="p-4 cursor-pointer" 
              onClick={() => navigator(`/${product.category}/${product.id}`)}
            >
              <h3 className="text-sm font-semibold line-clamp-1 hover:text-gray-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-500 text-xs">{product.colour}</p>
              <p className="text-lg font-bold mt-1">₹{product.price}</p>
            </div>

            <button
              className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </ScrollWrapper>
        </PageWrapper>
      ) : (
        <div className="w-full h-80 bg-gray-50 rounded-lg"></div>
      )}
    </div>
  );
}