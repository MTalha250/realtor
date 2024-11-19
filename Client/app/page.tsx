import About from "@/components/home/about";
import Blogs from "@/components/home/blogs";
import Hero from "@/components/home/hero";
import MostViewed from "@/components/home/mostViewed";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <MostViewed />
      <Blogs />
      <About />
    </div>
  );
};

export default page;
