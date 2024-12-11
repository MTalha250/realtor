import React from "react";
import img from "@/assets/hero.jpg";
import line from "@/assets/line-black.png";
import SearchCard from "./search";

const Hero = () => {
  return (
    <div className="h-[80vh] lg:h-screen relative">
      <img
        src={img.src}
        alt="Hero Background"
        className="absolute h-full w-full object-cover object-top"
      />
      <div className="absolute h-full w-full bg-white opacity-50"></div>
      <div className="absolute h-full w-full flex justify-center items-center">
        <div className="container flex flex-col items-center justify-center">
          <h1 className="max-[480px]:text-4xl text-5xl xl:text-6xl 2xl:text-7xl font-slab text-center max-w-5xl md:leading-[4rem] xl:leading-[5rem]">
            The <span className="text-secondary">Solution</span> to Finding Your
            Dream Home is{" "}
            <span className="text-secondary relative inline-block">
              Here
              <img
                src={line.src}
                alt="Underline decoration"
                className="absolute left-0 top-full w-full mt-1"
              />
            </span>
          </h1>
          <p className="text-center text-xl md:text-2xl 2xl:text-4xl my-10 sm:my-16">
            We help you find your dream home
          </p>
          <div className="w-full justify-center hidden lg:flex">
            <SearchCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
