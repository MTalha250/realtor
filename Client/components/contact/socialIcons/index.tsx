import React from "react";
import whatsapp from "@/assets/whatsapp.png";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import tiktok from "@/assets/tiktok.png";

const SocialIcons = () => {
  return (
    <div className="container py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-slab mb-10">
        Follow us on Social Media
      </h1>
      <div className="flex justify-center gap-5 sm:gap-10 md:gap-20">
        <a
          href="https://wa.me/1234567890"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={whatsapp.src}
            alt="whatsapp"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
        <a
          href="https://facebook.com"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={facebook.src}
            alt="facebook"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
        <a
          href="https://instagram.com"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={instagram.src}
            alt="instagram"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
        <a
          href="https://twitter.com"
          className="hover:scale-105 transition duration-300"
        >
          <img
            src={tiktok.src}
            alt="twitter"
            className="w-10 sm:w-14 h-10 sm:h-14"
          />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
