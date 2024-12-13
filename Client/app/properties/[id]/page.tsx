"use client";
import React, { useEffect, useState } from "react";
import img from "@/assets/hero.jpg";
import Slider from "@/components/propertyDetails/slider";
import { Heart, Forward } from "lucide-react";
import Main from "@/components/propertyDetails/main";
import Video from "@/components/propertyDetails/video";
import Map from "@/components/propertyDetails/map";
import Characteristics from "@/components/propertyDetails/characteristics";
import About from "@/components/propertyDetails/about";
import Similar from "@/components/propertyDetails/similar";
import Slider2 from "@/components/propertyDetails/slider2";
import { useParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property>();

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`
      );
      setProperty(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    property && (
      <div className="py-28 md:py-32 container">
        <div className="hidden lg:block">
          <Slider photos={property.images} />
        </div>
        <div className="lg:hidden">
          <Slider2 photos={property.images} />
        </div>
        <div className="flex gap-5 mt-5">
          <div className="flex gap-2 items-center">
            <Heart color="#ff2600" fill="#FF0000" size={24} />
            <span className="text-xl font-slab">Like</span>
          </div>
          <div className="flex gap-2 items-center">
            <Forward size={24} strokeWidth={3} />
            <span className="text-xl font-slab">Share</span>
          </div>
        </div>
        <Main property={property} />
        <Video photos={property.images} video={property.video} />
        <Map
          latitude={Number(property.location.latitude)}
          longitude={Number(property.location.longitude)}
          region={property.location.region}
        />
        <Characteristics characteristics={property.amenities} />
        {/* <About property={property} /> */}
        <Similar />
      </div>
    )
  );
};

export default page;
