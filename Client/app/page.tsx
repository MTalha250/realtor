import About from "@/components/home/about";
import Banner from "@/components/home/banner";
import Blogs from "@/components/home/blogs";
import CallToAction from "@/components/home/callToAction";
import Hero from "@/components/home/hero";
import SearchCard from "@/components/home/hero/search";
import MostViewed from "@/components/home/mostViewed";
import Testimonials from "@/components/home/testimonials";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <div className="-translate-y-36 container lg:hidden py-10 md:py-20">
        <SearchCard />
      </div>
      <div className="-translate-y-36 lg:translate-y-0">
        <MostViewed />
        <Blogs />
        <About />
        <Testimonials />
        <Banner />
        <CallToAction />
      </div>
    </div>
  );
};

export default page;
