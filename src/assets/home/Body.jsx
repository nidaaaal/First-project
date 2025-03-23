import React from "react";
import BodyBg from "./BodyBg";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import PageWrapper from "../animations/Pagewrapper";
import ScrollWrapper from "../animations/ScrollWrapper";
import Scrollx from "../animations/Scrollx";
const Body = () => {

 

  return (
   
    <div className="bg-gray-100 font-sans">
            
    <PageWrapper>
      <BodyBg/>



        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold text-orange-700">TOLUS SPRING COLLECTION</h1>
          <p className="mt-2 text-sm md:text-base">Find out our best spring collection. Offering our best quality product.</p>
          <button className="mt-4 px-4 md:px-6 py-2 bg-white text-black font-semibold">Buy Now</button>
        </div>


      <section className="py-12 px-4 md:px-10">
      <ScrollWrapper>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">NEW COLLECTION</h2>
        <p className="text-center mb-8 text-sm md:text-base">Our latest collection, where classic and contemporary styles converge.</p>
        </ScrollWrapper>
              <Scrollx>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Loro Piana", desc: "Slim Fit Striped Silk", price: "900", img: "/h1.avif" },
            { name: "White Pants", desc: "Slim Fit man pants", price: "1400", img: "/h2.avif" },
            { name: "beige shirts and pants", desc: " Slim Fit man shirt and pants ", price: "2999", img: "/h3.jpg" },
            { name: "Brown Bomber", desc: "Luxury unisex bomber jacket", price: "1900", img: "/h4.jpg" },
            { name: "Striped Top", desc: "kids gray top", price: "1500", img: "/h5.avif" },
            { name: "Grey T-shirt", desc: "Unisex grey t-shirt", price: "799", img: "/h6.jpg" }
          ].map((item, index) => (
            <div
              key={index}
              className="scale-90 rounded-md overflow-hidden shadow-lg hover:scale-95 transition-transform duration-300"
            >        <Scrollx>

              <img
                src={item.img}
                alt={item.name}
                className="w-full h-80 md:h-80 object-cover"
              />
                      </Scrollx>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <div className="flex justify-between items-center">
                  <p className="text-black font-bold text-lg">₹{item.price}</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Scrollx>
      <Scrollx>
    <Banner/>
    </Scrollx>
    <ScrollWrapper>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      <Link to="/men" className="relative block group">
        <img
          src="h8.jpg"
          alt="Men's Fashion"
          className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <h2 className="text-white text-2xl font-bold">Men's Fashion</h2>
          <button className="mt-3 px-4 py-2 text-white font-semibold rounded-lg hover:bg-[#8aa510bb] transition duration-300">
            Shop Now
          </button>
        </div>
      </Link>

      <Link to="/women" className="relative block group">
        <img
          src="h9.jpg"
          alt="Women's Fashion"
          className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <h2 className="text-white text-2xl font-bold">Women's Fashion</h2>
          <button className="mt-3 px-4 py-2 text-white  font-semibold rounded-lg hover:bg-[#8aa510bb] transition duration-300">
            Shop Now
          </button>
        </div>
      </Link>

      <Link to="/kids" className="relative block group">
        <img
          src="h10.jpg"
          alt="Kids' Fashion"
          className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <h2 className="text-white text-2xl font-bold">Kids' Fashion</h2>
          <button className="mt-3 px-4 py-2 text-white  font-semibold rounded-lg hover:bg-[#8aa510bb] transition duration-300">
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
