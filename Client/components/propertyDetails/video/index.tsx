import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface Props {
  video: string;
  photos: string[];
}

const Video = ({ video, photos }: Props) => {
  return (
    <div className="py-10 border-y border-black h-[60vh]">
      <Swiper
        className="mySwiper h-full w-full"
        spaceBetween={50}
        slidesPerView={2}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        <SwiperSlide>
          <div className="w-full h-full flex flex-col items-center">
            <Swiper
              className="mySwiper2 h-full w-full"
              direction={"vertical"}
              spaceBetween={50}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Autoplay]}
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <Zoom>
                    <img
                      src={photo}
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="text-xl mt-5">Photos</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex flex-col items-center">
            <video
              src={video}
              controls
              className="w-full h-full object-cover"
            />
            <p className="text-xl mt-5">Video</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Video;
