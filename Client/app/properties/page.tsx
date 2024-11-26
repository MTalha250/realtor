"use client";
import React, { useState } from "react";
import img from "@/assets/product.jpg";
import img1 from "@/assets/hero.jpg";
import Hero from "@/components/common/hero";
import { useSearchParams } from "next/navigation";
import SearchCard from "@/components/common/searchCard";
import GridThree from "@/components/grids/gridThree";
import { LayoutGrid, Rows3 } from "lucide-react";
import GridFour from "@/components/grids/gridFour";

const Properties = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");
  const [properties, setProperties] = useState<Partial<Property>[]>([
    {
      id: 1,
      images: [img.src],
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
    },
    {
      id: 2,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 33.748997,
        longitude: -84.387985,
        region: "Georgia",
      },
    },
    {
      id: 3,
      images: [img.src],
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
    },
    {
      id: 4,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 33.748997,
        longitude: -84.387985,
        region: "Georgia",
      },
    },
    {
      id: 5,
      images: [img.src],
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
    },
    {
      id: 6,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 33.748997,
        longitude: -84.387985,
        region: "Georgia",
      },
    },
    {
      id: 7,
      images: [img.src],
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
    },
    {
      id: 8,
      images: [img.src],
      title: "Georgia Town Park",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 33.748997,
        longitude: -84.387985,
        region: "Georgia",
      },
    },
    {
      id: 9,
      images: [img.src],
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
    },
  ]);
  return (
    <div>
      <Hero
        img={img1.src}
        title={
          category === "sale" ? "Properties For Sale" : "Properties For Rent"
        }
      />
      <div className="container flex justify-center py-10">
        <SearchCard />
      </div>
      <div className="container">
        <div className="w-full relative h-5">
          <div className="flex gap-3 absolute right-0">
            <button onClick={() => setView("grid")}>
              <LayoutGrid size={30} className="text-primary" />
            </button>
            <button onClick={() => setView("list")}>
              <Rows3 size={30} className="text-primary" />
            </button>
          </div>
        </div>
        {view === "grid" ? (
          <GridFour products={properties} loading={loading} />
        ) : (
          <GridThree products={properties} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Properties;
