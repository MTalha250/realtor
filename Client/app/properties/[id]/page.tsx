"use client";
import React, { useState } from "react";
import img from "@/assets/hero.jpg";
import Slider from "@/components/propertyDetails/slider";

const page = () => {
  const [property, setProperty] = useState<Property>({
    id: 1,
    images: [img.src, img.src, img.src, img.src, img.src],
    title: "Georgia Town Park",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    bedrooms: 3,
    bathrooms: 2,
    price: 200000,
    priceType: "month",
    area: 2000,
    location: {
      latitude: 33.748997,
      longitude: -84.387985,
      region: "Georgia",
    },
    propertyType: "House",
    category: "Residential",
    dealType: "Sale",
    createdAt: "2021-07-01T00:00:00.000Z",
    updatedAt: "2021-07-01T00:00:00.000Z",
  });

  return (
    <div className="py-32 container">
      <Slider photos={property.images} />
    </div>
  );
};

export default page;
