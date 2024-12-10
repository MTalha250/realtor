import React from "react";
import Hero from "@/components/common/hero";
import img from "@/assets/hero.jpg";
import CallToAction from "@/components/home/callToAction";
import Banner from "@/components/home/banner";
import About from "@/components/home/about";
import Calculator from "@/components/sell-rent/calculator";

const SellRent = () => {
  return (
    <div>
      <Hero img={img.src} title="Sell or Rent" />
      <Calculator />
      <About />
      <Banner />
      <CallToAction />
    </div>
  );
};

export default SellRent;
