"use client";
import Hero from "@/components/common/hero";
import React, { useEffect, useState } from "react";
import img1 from "@/assets/hero.jpg";
import img from "@/assets/product.jpg";
import SearchCard from "@/components/home/hero/search";
import GridTwo from "@/components/grids/gridTwo";
import axios from "axios";

const AllProperties = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Partial<Property>[]>([]);
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`
      );
      console.log(response.data);
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <Hero title="All Properties" img={img1.src} />
      <div className="container mx-auto flex justify-center py-10">
        <SearchCard />
      </div>
      <div className="container">
        <GridTwo products={properties} loading={loading} />
      </div>
    </div>
  );
};

export default AllProperties;
