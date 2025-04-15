import React, { useContext, useState, useEffect } from "react";
import BodyBg from "./BodyBg";
import { Link, useNavigate } from "react-router-dom";
import Banner from "./Banner";
import PageWrapper from "../animations/Pagewrapper";
import ScrollWrapper from "../animations/ScrollWrapper";
import Scrollx from "../animations/Scrollx";
import { useProducts } from "../components/UseProduct";
import { CartContext } from "../components/CartProvider";
import WishlistButton from "../components/wishbutton";
import Loading from "../components/Loading";

const Body = () => {
  const { product, isLoading } = useProducts();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProductClick = (item) => {
    navigate(`/${item.category}/${item.id}`);
  };

  return (
    <div className="bg-gray-100 font-sans">
      <PageWrapper>
        <BodyBg />
        
        {/* New Collection Section */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
          <ScrollWrapper>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
              NEW COLLECTION
            </h2>
            <p className="text-center mb-6 sm:mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Our latest collection, where classic and contemporary styles converge.
            </p>
          </ScrollWrapper>

          <Scrollx>
            {isLoading ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="scale-90 rounded-md overflow-hidden shadow-lg bg-white">
                    <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-200 animate-pulse">
                      <div className="h-full flex items-center justify-center">
                        <Loading size="small" />
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      <div className="flex justify-between items-center pt-4">
                        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {product.slice(13, 19).map((item) => (
                  <div
                    key={item.id}
                    className="scale-90 rounded-md overflow-hidden shadow-lg hover:scale-95 transition-transform duration-300 bg-white cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <Scrollx>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 sm:h-72 md:h-80 object-cover"
                        loading="lazy"
                      />
                    </Scrollx>

                    <div className="absolute top-3 right-3">
                      <WishlistButton product={item} />
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                        {item.colour}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-black font-bold text-base sm:text-lg">
                          ₹{item.price}
                        </p>
                        <button
                          type="button"
                          className="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-green-400 transition-colors duration-300 text-sm sm:text-base"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Scrollx>
        </section>

        {isClient && (
          <Scrollx>
            <Banner />
          </Scrollx>
        )}

        {/* Category Section */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
          <ScrollWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {['men', 'women', 'kids'].map((category) => {
                const imageMap = {
                  men: 'h8.jpg',
                  women: 'h9.jpg',
                  kids: 'h10.jpg'
                };
                const titleMap = {
                  men: "Men's Fashion",
                  women: "Women's Fashion",
                  kids: "Kids' Fashion"
                };

                return (
                  <div 
                    key={category}
                    className="relative block group rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/${category}`)}
                  >
                    <img
                      src={imageMap[category]}
                      alt={titleMap[category]}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Mobile text - always visible on small screens */}
                    <div className="sm:hidden absolute inset-0  bg-opacity-30 flex flex-col items-center justify-center rounded-lg">
                      <h2 className="text-white text-xl font-bold">{titleMap[category]}</h2>
                    </div>
                    {/* Desktop hover effect - hidden on mobile */}
                    <div className="hidden sm:flex absolute inset-0  bg-opacity-40 flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                      <h2 className="text-white text-xl sm:text-2xl font-bold">{titleMap[category]}</h2>
                      <button 
                        className="mt-2 sm:mt-3 px-3 py-1 sm:px-4 sm:py-2 text-white font-semibold rounded-lg hover:bg-[#8aa510bb] transition duration-300 text-sm sm:text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/${category}`);
                        }}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollWrapper>
        </section>
      </PageWrapper>
    </div>
  );
};

export default Body;