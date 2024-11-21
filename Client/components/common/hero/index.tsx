import React from "react";
import line from "@/assets/line-yellow.png";

interface Props {
  title: string;
  img: string;
}

const Hero = ({ title, img }: Props) => {
  return (
    <div className="relative h-[50vh] pt-20">
      <img src={img} alt="Hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
        <h1 className="text-black text-6xl font-slab text-center">
          <span className="relative">
            {title}
            <img
              src={line.src}
              className="absolute right-0 -bottom-5 translate-x-1/3"
            />
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
