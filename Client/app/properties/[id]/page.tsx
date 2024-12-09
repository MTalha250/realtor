"use client";
import React, { useState } from "react";
import img from "@/assets/hero.jpg";
import Slider from "@/components/propertyDetails/slider";
import { Heart, Forward } from "lucide-react";
import Main from "@/components/propertyDetails/main";
import Video from "@/components/propertyDetails/video";
import Map from "@/components/propertyDetails/map";
import Characteristics from "@/components/propertyDetails/characteristics";
import About from "@/components/propertyDetails/about";
import Similar from "@/components/propertyDetails/similar";

const page = () => {
  const [property, setProperty] = useState<Property>({
    id: 1,
    images: [img.src, img.src, img.src, img.src, img.src],
    title: "11 Bedroom Equestrian For Sale In Cockermouth",
    description:
      "The description was automatically translated. Show original A journey through time Entire Hall's historic roots run deep, with its main tower dating back to 1290. The south wing, built around 1590, adds to the charm, while the main building, completed in 1863, is a testament to Victorian architectural grandeur. The property's premises licence adds to its versatility, making it an ideal venue for business and leisure travellers alike.",
    bedrooms: 3,
    bathrooms: 2,
    price: 200000,
    priceType: "month",
    area: 2000,
    location: {
      latitude: 11.243,
      longitude: -74.211,
      region: "El Rodadero, Santa Marta",
    },
    propertyType: "House",
    category: "Residential",
    dealType: "Sale",
    condition: "New",
    view: ["City", "Mountain"],
    outdoor: ["Balcony", "Garden"],
    propertyStyle: ["Modern"],
    leaseTerm: "Long Term",
    floors: 2,
    noiseLevel: "Low",
    laundry: "In Unit",
    securityFeatures: ["Alarm", "Doorman"],
    amenities: ["Air Conditioning", "Dishwasher"],
    internet: "Fiber",
    heating: ["Central"],
    cooling: ["Central"],
    views: 100,
    likes: 50,
    video:
      "https://res.cloudinary.com/dewqsghdi/video/upload/v1732637542/A_short_placeholder_video_ysw7yh.mp4",
    characteristics: ["Gym", "Swimming Pool", "Garage", "Fireplace"],
    createdAt: "2021-07-01T00:00:00.000Z",
    updatedAt: "2021-07-01T00:00:00.000Z",
  });

  return (
    <div className="py-32 container">
      <Slider photos={property.images} />
      <div className="flex gap-5 my-5">
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
        latitude={property.location.latitude}
        longitude={property.location.longitude}
        region={property.location.region}
      />
      <Characteristics characteristics={property.characteristics} />
      {/* <About property={property} /> */}
      <Similar />
    </div>
  );
};

export default page;
