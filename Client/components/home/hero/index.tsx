import React from "react";
import img from "@/assets/hero.jpg";
import line from "@/assets/line-black.png";
import SearchCard from "./search";

const Hero = () => {
  return (
    <div className="h-screen relative">
      <img
        src={img.src}
        alt="Hero Background"
        className="absolute h-full w-full object-cover object-top"
      />
      <div className="absolute h-full w-full bg-white opacity-50"></div>
      <div className="absolute h-full w-full flex justify-center items-center">
        <div className="container flex flex-col items-center justify-center">
          <h1 className="text-6xl font-slab text-center max-w-5xl leading-[5rem]">
            The <span className="text-secondary">Solution</span> to Finding Your
            Dream Home is{" "}
            <span className="text-secondary relative">
              Here <img src={line.src} className="absolute left-0" />
            </span>
          </h1>
          <p className="text-2xl text-center my-20">
            We help you find your dream home
          </p>
          <SearchCard />
        </div>
      </div>
    </div>
  );
};

export default Hero;
