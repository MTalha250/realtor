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
    <div className="py-10 border-y flex flex-col md:flex-row gap-10  border-black">
      <div className="w-full h-[50vh] flex flex-col items-center">
        <Swiper
          className="mySwiper2 h-full w-full"
          direction={"vertical"}
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
                  className="w-full h-[50vh] object-cover"
                />
              </Zoom>
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="text-xl mt-5">Photos</p>
      </div>
      <div className="w-full h-[50vh] flex flex-col items-center">
        <video src={video} controls className="w-full h-full object-cover" />
        <p className="text-xl mt-5">Video</p>
      </div>
    </div>
  );
};

export default Video;
