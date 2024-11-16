"use client"
import { A11y, Autoplay } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FaInstagram } from "react-icons/fa"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

interface CarouselItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  url: string;
}

interface CarouselSwiperProps {
  items?: CarouselItem[];
  hiddenClasses?: string;
  slidesPerView?: number;
  slidesPerGroup?: number;
}

export const CarouselSwiper = ({ items = [], hiddenClasses = "", slidesPerView = 4, slidesPerGroup = 4 }: CarouselSwiperProps) => {
  return (
    <div className={`w-full ${hiddenClasses}`}>
      <Swiper className={`w-full`}
        modules={[A11y, Autoplay]}
        spaceBetween={12}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
      >
        {items && items.map((item, index) => (
          <SwiperSlide key={index}>
            {item.type === "image" ? (
              <div className='relative'>
                <img src={item.src} alt={item.alt} className='group/item rounded-md w-full h-80 md:h-96 lg:h-[32rem] object-cover image:hover:bg-slate-700' />
                <a href={item.url} className="rounded-md absolute w-full h-full top-0 left-0 bg-black opacity-0 z-10 transition-opacity duration-300 hover:opacity-70 ">
                  <FaInstagram className='text-white text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                </a>
              </div>
            ) : (
              <div className='relative'>
                <video autoPlay loop muted playsInline className='group/item rounded-md w-full h-80 md:h-96 lg:h-[32rem] object-cover'>
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <a href={item.url} className="rounded-md absolute w-full h-full top-0 left-0 bg-black opacity-0 z-10 transition-opacity duration-300 hover:opacity-70 ">
                  <FaInstagram className='text-white text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                </a>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
