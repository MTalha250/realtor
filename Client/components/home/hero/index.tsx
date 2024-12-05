import React from "react";
import img from "@/assets/hero.jpg";
import line from "@/assets/line-black.png";
import SearchCard from "./search";

const Hero = () => {
  return (
    <div className="relative h-screen" style={{ paddingTop: "60px" }}>
      {" "}
      <img
        src={img.src}
        alt="Hero Background"
        className="absolute h-full w-full object-cover object-top z-[-1]"
      />
      <div className="absolute h-full w-full bg-white opacity-50 z-[-1]"></div>
      <div className="absolute h-full w-full flex justify-center items-center px-4 sm:px-10">
        <div className="container flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-slab max-w-xl md:max-w-5xl leading-[3rem] md:leading-[5rem]">
            The <span className="text-secondary">Solution</span> to Finding Your
            Dream Home is{" "}
            <span className="text-secondary relative">
              Here <img src={line.src} className="absolute left-0" />
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl my-6 md:my-20">
            We help you find your dream home
          </p>
          <SearchCard />
        </div>
      </div>
    </div>
  );
};

export default Hero;
