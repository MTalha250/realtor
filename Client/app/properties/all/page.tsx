"use client";
import Hero from "@/components/common/hero";
import React, { useState } from "react";
import img1 from "@/assets/hero.jpg";
import img from "@/assets/product.jpg";
import SearchCard from "@/components/home/hero/search";
import GridTwo from "@/components/grids/gridTwo";

const AllProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Partial<Property>[]>([
    {
      id: 1,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "sale",
    },
    {
      id: 2,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "rent",
    },
    {
      id: 3,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "sale",
    },
    {
      id: 4,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "rent",
    },
    {
      id: 5,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "sale",
    },
    {
      id: 6,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "rent",
    },
    {
      id: 7,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "sale",
    },
    {
      id: 8,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "rent",
    },
    {
      id: 9,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      dealType: "rent",
    },
  ]);
  return (
    <div>
      <Hero title="All Properties" img={img1.src} />
      <div className="container flex justify-center py-10">
        <SearchCard />
      </div>
      <div className="container">
        <GridTwo products={properties} loading={loading} />
      </div>
    </div>
  );
};

export default AllProperties;
