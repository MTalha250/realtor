import Link from "next/link";
import React from "react";

const CallToAction = () => {
  return (
    <div className="container flex flex-col items-center py-10 md:py-20">
      <h1 className="text-3xl md:text-4xl text-center font-slab mb-4">
        Contact Us Now
      </h1>
      <p className="text-center max-w-2xl mb-8">
        Don't hesitate to contact our team for more information or to set up an
        appointment. We are ready to help you find your dream home
      </p>
      <Link
        href="/contact"
        className="bg-secondary py-4 px-8 text-lg rounded-md text-white hover:bg-secondary2 transition duration-300"
      >
        Contact Us
      </Link>
    </div>
  );
};

export default CallToAction;
