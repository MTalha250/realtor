"use client";
import GridOne from "@/components/grids/gridOne";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import img from "@/assets/product.jpg";

const MostViewed = () => {
  const [selected, setSelected] = useState("new-developments");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Partial<Product>[]>([
    {
      id: 1,
      images: [img.src],
      price: 1000000,
      priceType: "year",
      title: "Modern House",
      description: "Description of the house you are offering",
      area: 72,
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 2,
      images: [img.src],
      price: 1000000,
      priceType: "year",
      title: "Modern House",
      description: "Description of the house you are offering",
      area: 72,
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 3,
      images: [img.src],
      price: 1000000,
      priceType: "year",
      title: "Modern House",
      description: "Description of the house you are offering",
      area: 72,
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 4,
      images: [img.src],
      price: 1000000,
      priceType: "year",
      title: "Modern House",
      description: "Description of the house you are offering",
      area: 72,
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 5,
      images: [img.src],
      price: 1000000,
      priceType: "year",
      title: "Modern House",
      description: "Description of the house you are offering",
      area: 72,
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 6,
      images: [img.src],
      price: 1000000,
      priceType: "year",
      title: "Modern House",
      description: "Description of the house you are offering",
      area: 72,
      bedrooms: 3,
      bathrooms: 2,
    },
  ]);

  useState;
  return (
    <div className="container py-20">
      <div className="w-full bg-[#F1F1F1] rounded-3xl shadow py-10 px-20">
        <h1 className="text-4xl text-center font-slab mb-4">Most Viewed</h1>
        <p className="text-center mb-8">
          We offer a widest section of the newest properties ready for you to
          explore
        </p>
        <div className="w-full bg-white flex justify-between items-center p-5 rounded-2xl">
          <div className="flex gap-5 items-center">
            <Button
              className={
                "text-lg h-16 rounded-xl px-8 bg-transparent text-black hover:bg-primary hover:text-white transition duration-200 " +
                (selected === "new-developments" ? "bg-primary text-white" : "")
              }
              onClick={() => setSelected("new-developments")}
            >
              New Developments
            </Button>
            <Button
              className={
                "text-lg h-16 rounded-xl px-8 bg-transparent text-black hover:bg-primary hover:text-white transition duration-200 " +
                (selected === "used-properties" ? "bg-primary text-white" : "")
              }
              onClick={() => setSelected("used-properties")}
            >
              Used Properties
            </Button>
            <Button
              className={
                "text-lg h-16 rounded-xl px-8 bg-transparent text-black hover:bg-primary hover:text-white transition duration-200 " +
                (selected === "rentals" ? "bg-primary text-white" : "")
              }
              onClick={() => setSelected("rentals")}
            >
              Rentals
            </Button>
          </div>
          <Link
            href="/properties/all"
            className="text-lg h-16 rounded-xl px-8 bg-primary text-white flex items-center justify-center hover:bg-primary3 transition duration-300"
          >
            All Properties
          </Link>
        </div>
        <GridOne loading={loading} products={products} />
      </div>
    </div>
  );
};

export default MostViewed;
