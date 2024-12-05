import Link from "next/link";
import React from "react";

const CallToAction = () => {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-10 sm:py-20 flex flex-col items-center justify-center">
      <h1 className="text-3xl sm:text-4xl font-slab text-center mb-4">
        Contact Us Now
      </h1>
      <p className="text-center text-sm sm:text-base max-w-xl sm:max-w-2xl mb-8">
        Don't hesitate to contact our team for more information or to set up an
        appointment. We are ready to help you find your dream home.
      </p>
      <Link
        href="/contact"
        className="bg-secondary py-3 sm:py-4 px-6 sm:px-8 text-lg rounded-md text-white hover:bg-secondary2 transition duration-300"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default CallToAction;
