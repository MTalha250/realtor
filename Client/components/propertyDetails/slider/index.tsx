"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FreeMode, Thumbs, Pagination } from "swiper/modules";

const Slider = ({ photos }: { photos: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="flex w-full h-[75vh]">
      <div className="w-[80%]">
        <Swiper
          spaceBetween={10}
          direction="vertical"
          thumbs={{ swiper: thumbsSwiper }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[FreeMode, Thumbs, Pagination]}
          className="mySwiper2 h-full"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <Zoom>
                <img
                  src={photo}
                  alt={`Slide ${index}`}
                  className="object-cover h-[75vh] w-full"
                  loading="lazy"
                />
              </Zoom>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-[20%] ml-4 h-full">
        <Swiper
          // @ts-ignore
          onSwiper={setThumbsSwiper}
          spaceBetween={20}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          direction="vertical"
          modules={[FreeMode, Thumbs, Pagination]}
          className="mySwiper h-full"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <img
                src={photo}
                alt={`Thumbnail ${index}`}
                className="object-cover cursor-pointer w-full h-full"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
