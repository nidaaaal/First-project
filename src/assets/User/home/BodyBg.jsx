import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const images = [
    "/home.avif",
    "/home5.avif",
    "/home3.jpg",
];

const BodyBg = () => {
  const navigator = useNavigate();
  
  return (
    <section className="relative mt-16 md:mt-30"> {/* Added margin for fixed navbar */}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-[50vh] sm:h-[60vh] md:h-[100vh]" /* Responsive height */
        loop={true}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img 
              src={src} 
              alt={`Slide ${index}`} 
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Content container with responsive padding */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <div className="px-4 py-6 md:px-8 md:py-10 max-w-[90%]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-700 mb-2 md:mb-4">
            TOLUS SPRING COLLECTION
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-sans text-current mb-4 md:mb-6">
            Find out our best spring collection. Offering our best quality product.
          </p>
          <button 
            className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            onClick={() => navigator('/women/20')}
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default BodyBg;