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
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import whatsapp from "@/assets/whatsapp.png";
import tiktok from "@/assets/tiktok.png";

import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const incrementView = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}/increment-views`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const incrementLike = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}/increment-likes`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
    incrementView();
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
          <button
            onClick={incrementLike}
            className="flex gap-2 items-center hover:scale-105 transition duration-300"
          >
            <Heart color="#ff2600" fill="#FF0000" size={24} />
            <span className="text-xl font-slab">Like</span>
          </button>
          <Dialog>
            <DialogTrigger className="flex gap-2 items-center">
              <Forward size={24} strokeWidth={3} />
              <span className="text-xl font-slab">Share</span>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-xl font-semibold text-gray-800 text-center">
                Share this property
              </DialogTitle>
              <div className="flex flex-col items-center gap-6 mt-6">
                <p className="text-center text-gray-600 text-sm">
                  Share this amazing property with your friends:
                  <br />
                  <span className="font-medium">{property.title}</span>
                  <br />
                  Located at{" "}
                  <span className="italic">{property.location.region}</span>.
                </p>
                <div className="flex justify-center gap-4">
                  {/* Facebook Button */}
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}&quote=${encodeURIComponent(
                          `Check out this amazing property: ${property.title} located at ${property.location.region}!`
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-2 bg-blue-600 rounded-full transition-transform transform hover:scale-110 hover:bg-blue-700"
                  >
                    <img
                      src={facebook.src}
                      alt="facebook"
                      className="w-8 h-8"
                    />
                  </button>

                  {/* Instagram Button */}
                  <button
                    onClick={() =>
                      window.open(`https://www.instagram.com/`, "_blank")
                    }
                    className="p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full transition-transform transform hover:scale-110"
                  >
                    <img
                      src={instagram.src}
                      alt="instagram"
                      className="w-8 h-8 bg-white rounded-lg"
                    />
                  </button>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(
                          `Check out this amazing property: ${property.title} located at ${property.location.region}! ${window.location.href}`
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-2 bg-green-500 rounded-full transition-transform transform hover:scale-110 hover:bg-green-600"
                  >
                    <img
                      src={whatsapp.src}
                      alt="whatsapp"
                      className="w-8 h-8"
                    />
                  </button>

                  {/* TikTok Button */}
                  <button
                    onClick={() =>
                      window.open(`https://www.tiktok.com/`, "_blank")
                    }
                    className="p-2 bg-black rounded-full transition-transform transform hover:scale-110 hover:bg-gray-800"
                  >
                    <img src={tiktok.src} alt="tiktok" className="w-8 h-8" />
                  </button>

                  {/* Copy Link Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Check out this amazing property: ${property.title} located at ${property.location.region}! ${window.location.href}`
                      );
                      alert("Link copied to clipboard!");
                    }}
                    className="py-2 px-4 bg-gray-300 rounded-full transition-transform transform hover:scale-110 hover:bg-gray-400"
                  >
                    <span className="text-black font-semibold text-sm">
                      Copy Link
                    </span>
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Main property={property} />
        <Video photos={property.images} video={property.video} />
        <Map
          latitude={Number(property.location.latitude)}
          longitude={Number(property.location.longitude)}
          region={property.location.region}
        />
        <Characteristics characteristics={property.amenities} />
        <About property={property} />
        <Similar />
      </div>
    )
  );
};

export default page;
