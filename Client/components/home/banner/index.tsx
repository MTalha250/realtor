import React from "react";

const Banner = () => {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
      <div className="bg-primary2 h-[30vh] sm:h-[40vh] flex justify-center items-center rounded-3xl hover:scale-105 transition duration-300">
        <h1 className="text-2xl sm:text-4xl font-slab text-white text-center max-w-md sm:max-w-lg">
          Your Dream Home Is In Front Of Your Eyes
        </h1>
      </div>
    </div>
  );
};

export default Banner;
