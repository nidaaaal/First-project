import React, { useContext, useRef, useEffect, useState } from "react";
import { CartContext } from "../components/CartProvider";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../animations/Pagewrapper";
import ScrollWrapper from "../animations/ScrollWrapper";
import WishlistButton from '../components/wishbutton';

export default function ProductCard({ product }) {
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

  return (
    <div 
      className="w-full max-w-xs overflow-hidden z-1 mt-10"
      ref={cardRef}
    >
      {isVisible && (
        <PageWrapper>
          <ScrollWrapper>
            <div 
              className="relative w-full h-80 cursor-pointer" 
              onClick={() => navigator(`/${product.category}/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <WishlistButton product={product} />
            </div>
            
            <div 
              className="p-4 cursor-pointer" 
              onClick={() => navigator(`/${product.category}/${product.id}`)}
            >
              <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>
              <p className="text-gray-500 text-xs">{product.colour}</p>
              <p className="text-lg font-bold mt-1">₹{product.price}</p>
            </div>

            <button
              className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </ScrollWrapper>
        </PageWrapper>
      )}
    </div>
  );
}