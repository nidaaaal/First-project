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
  const navigator=useNavigate()
  return (
    <section className="relative">
      <Swiper
        spaceBetween={10}
        slidesPerView={1} 
        autoplay={{ delay: 5000,}}
        pagination={{ clickable: true }} 
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-full"
        loop={true}
        rewind={true} 
        allowSlidePrev={false}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
  <div className="absolute inset-0 z-10"></div>
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
  <h1 className="text-2xl md:text-4xl font-bold text-orange-700">TOLUS SPRING COLLECTION</h1>
  <p className="mt-2 text-sm md:text-base font-sans">Find out our best spring collection. Offering our best quality product.</p>
  <button className="mt-4 px-4 md:px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300" onClick={()=>navigator('/women/20')}>
    Buy Now
  </button>
</div>
</section>
  );
};

export default BodyBg;