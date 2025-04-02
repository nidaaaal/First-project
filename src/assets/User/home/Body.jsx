import React, { useContext } from "react";
import BodyBg from "./BodyBg";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import PageWrapper from "../animations/Pagewrapper";
import ScrollWrapper from "../animations/ScrollWrapper";
import Scrollx from "../animations/Scrollx";
import { useProducts } from "../components/UseProduct";
import { CartContext } from "../components/CartProvider";
import WishlistButton from "../components/wishbutton";

const Body = () => {
  const { product } = useProducts();
  const { addToCart } = useContext(CartContext);

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
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {product.slice(13, 19).map((item) => (
                <div
                  key={item.id}
                  className="scale-90 rounded-md overflow-hidden shadow-lg hover:scale-95 transition-transform duration-300 bg-white"
                >
                  <Scrollx>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 sm:h-72 md:h-80 object-cover"
                    />
                  </Scrollx>

                  <WishlistButton product={item} />

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
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Scrollx>
        </section>

        <Scrollx>
          <Banner />
        </Scrollx>

        <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
          <ScrollWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <Link to="/men" className="relative block group rounded-lg overflow-hidden">
                <img
                  src="h8.jpg"
                  alt="Men's Fashion"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Men's Fashion</h2>
                  <button className="mt-2 sm:mt-3 px-3 py-1 sm:px-4 sm:py-2 text-white font-semibold rounded-lg hover:bg-[#8aa510bb] transition duration-300 text-sm sm:text-base">
                    Shop Now
                  </button>
                </div>
              </Link>

              <Link to="/women" className="relative block group rounded-lg overflow-hidden">
                <img
                  src="h9.jpg"
                  alt="Women's Fashion"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Women's Fashion</h2>
                  <button className="mt-2 sm:mt-3 px-3 py-1 sm:px-4 sm:py-2 text-white font-semibold rounded-lg hover:bg-[#8aa510bb] transition duration-300 text-sm sm:text-base">
                    Shop Now
                  </button>
                </div>
              </Link>

              <Link to="/kids" className="relative block group rounded-lg overflow-hidden">
                <img
                  src="h10.jpg"
                  alt="Kids' Fashion"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <h2 className="text-white text-xl sm:text-2xl font-bold">Kids' Fashion</h2>
                  <button className="mt-2 sm:mt-3 px-3 py-1 sm:px-4 sm:py-2 text-white font-semibold rounded-lg hover:bg-[#8aa510bb] transition duration-300 text-sm sm:text-base">
                    Shop Now
                  </button>
                </div>
              </Link>
            </div>
          </ScrollWrapper>
        </section>
      </PageWrapper>
    </div>
  );
};

export default Body;