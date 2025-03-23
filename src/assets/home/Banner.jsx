import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import ScrollWrapper from '../animations/ScrollWrapper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [
  '/h7.jpg', 
  '/h12.jpg',
];

const Banner = () => {
  return (
    <ScrollWrapper>

    <div className="relative w-full h-screen mt-20 mb-20">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
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
                className="w-full h-full object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
              />

              <div className="absolute inset-0 flex flex-col justify-center items-center  bg-opacity-50 text-white text-center p-6">
                <h1 className="text-5xl font-bold my-4">New Season, New Style</h1>
                <p className="text-lg mt-4 font-poppins">
                  Discover the latest trends in fashion with our exclusive collection.
                </p>
                <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-300 transition duration-300">
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