import About from "@/components/home/about";
import Banner from "@/components/home/banner";
import Blogs from "@/components/home/blogs";
import CallToAction from "@/components/home/callToAction";
import Hero from "@/components/home/hero";
import MostViewed from "@/components/home/mostViewed";
import Testimonials from "@/components/home/testimonials";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <MostViewed />
      <Blogs />
      <About />
      <Testimonials />
      <Banner />
      <CallToAction />
    </div>
  );
};

export default page;
