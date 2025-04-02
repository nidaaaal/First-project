import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ScrollWrapper from '../animations/ScrollWrapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const images = [
  '/h7.jpg',
  '/h12.jpg',
];

const Banner = () => {
  const navigator = useNavigate();
  
  return (
    <ScrollWrapper>
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-screen mt-16 mb-10 md:mb-20 px-4">
      <Swiper
  spaceBetween={0}
  slidesPerView={1}
  autoplay={{ 
    delay: 5000, 
    disableOnInteraction: false 
  }}
  pagination={{ 
    clickable: true,
    dynamicBullets: true,
    bulletClass: 'swiper-pagination-bullet', // Single class
    bulletActiveClass: 'swiper-pagination-bullet-active' // Single class
  }}
  modules={[Pagination, Navigation, Autoplay]}
  className="w-full h-full"
  loop={true}
>
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={src}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover rounded-xl md:rounded-3xl transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-30 text-white text-center p-4 sm:p-6 md:p-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
                    New Season, New Style
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-3 md:mt-4 font-poppins max-w-2xl mx-auto">
                    Discover the latest trends in fashion with our exclusive collection.
                  </p>
                  <button 
                    className="mt-3 sm:mt-4 md:mt-6 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition duration-300"
                    onClick={() => navigator('/all')}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ScrollWrapper>
  );
};

export default Banner;