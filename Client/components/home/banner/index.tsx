import React from "react";

const Banner = () => {
  return (
    <div className="container py-10 md:py-20">
      <div className="bg-primary2 h-[40vh] flex justify-center items-center rounded-3xl hover:scale-105 transition duration-300">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-slab text-white text-center max-w-lg p-8">
          Your Dream Home Is In Front Of Your Eyes
        </h1>
      </div>
    </div>
  );
};

export default Banner;
