"use client";
import React, { useState } from "react";
import img from "@/assets/product.jpg";
import { useSearchParams } from "next/navigation";
import SearchCard from "@/components/common/searchCard";
import GridThree from "@/components/grids/gridThree";
import { LayoutGrid, Rows3, Target } from "lucide-react";
import GridFour from "@/components/grids/gridFour";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { useRouter } from "next/navigation";

const Properties = () => {
  const searchParams = useSearchParams();
  const dealType = searchParams.get("dealType");
  const location = searchParams.get("location");
  const parsedLocation = location ? JSON.parse(location) : null;
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [properties, setProperties] = useState<Partial<Property>[]>([
    {
      id: 1,
      images: [img.src],
      title: "Historic Center Apartment",
      description:
        "Experience the charm of Santa Marta's Historic Center in this cozy apartment. Close to the best restaurants, bars, and cultural spots.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "month",
      area: 2000,
      location: {
        latitude: 11.2408,
        longitude: -74.199,
        region: "Historic Center, Santa Marta",
      },
    },
    {
      id: 2,
      images: [img.src],
      title: "Beachfront Villa in Rodadero",
      description:
        "A luxurious villa steps away from the golden sands of El Rodadero Beach. Perfect for a family getaway or a romantic retreat.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 11.243,
        longitude: -74.211,
        region: "El Rodadero, Santa Marta",
      },
    },
    {
      id: 3,
      images: [img.src],
      title: "Tranquil Retreat near Minca",
      description:
        "Relax in the lush green hills near Minca, a short drive from Santa Marta. Ideal for nature lovers and peace seekers.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "month",
      area: 2000,
      location: {
        latitude: 11.245,
        longitude: -74.1985,
        region: "Near Minca, Santa Marta",
      },
    },
    {
      id: 4,
      images: [img.src],
      title: "Luxury Condo in Pozos Colorados",
      description:
        "Enjoy stunning ocean views from this modern condo in Pozos Colorados, a quiet neighborhood perfect for relaxation.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 11.25,
        longitude: -74.22,
        region: "Pozos Colorados, Santa Marta",
      },
    },
    {
      id: 5,
      images: [img.src],
      title: "Cozy Apartment near Taganga",
      description:
        "Stay in this charming apartment near the fishing village of Taganga. Perfect for diving enthusiasts and beach lovers.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "month",
      area: 2000,
      location: {
        latitude: 11.235,
        longitude: -74.21,
        region: "Taganga, Santa Marta",
      },
    },
    {
      id: 6,
      images: [img.src],
      title: "Modern Loft near Marina",
      description:
        "A stylish and modern loft just minutes from Marina Santa Marta. Ideal for exploring the city and enjoying water activities.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 11.243,
        longitude: -74.205,
        region: "Marina Area, Santa Marta",
      },
    },
    {
      id: 7,
      images: [img.src],
      title: "Quiet Home in Gaira",
      description:
        "A comfortable home in Gaira, a peaceful area near El Rodadero and the main attractions of Santa Marta.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "month",
      area: 2000,
      location: {
        latitude: 11.23,
        longitude: -74.215,
        region: "Gaira, Santa Marta",
      },
    },
    {
      id: 8,
      images: [img.src],
      title: "Boutique Apartment in Bello Horizonte",
      description:
        "Stay in this elegant apartment in Bello Horizonte, close to pristine beaches and high-end restaurants.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "night",
      area: 2000,
      location: {
        latitude: 11.238,
        longitude: -74.202,
        region: "Bello Horizonte, Santa Marta",
      },
    },
    {
      id: 9,
      images: [img.src],
      title: "Family Home near Quinta de San Pedro",
      description:
        "A spacious family home located near the historic Quinta de San Pedro Alejandrino, ideal for exploring Santa Marta's heritage.",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      priceType: "month",
      area: 2000,
      location: {
        latitude: 11.239,
        longitude: -74.22,
        region: "Near Quinta de San Pedro, Santa Marta",
      },
    },
  ]);

  const center = {
    lat: parsedLocation
      ? parsedLocation.latitude
      : properties.reduce(
          (acc, property) => acc + (property.location?.latitude || 0),
          0
        ) / properties.length,
    lng: parsedLocation
      ? parsedLocation.longitude
      : properties.reduce(
          (acc, property) => acc + (property.location?.longitude || 0),
          0
        ) / properties.length,
  };

  return (
    <div className="pt-20">
      {isLoaded && (
        <div className="mt-2 relative">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "500px",
            }}
            center={center}
            zoom={15}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            {properties.map((property) => (
              <Marker
                onClick={() => router.push(`/properties/${property.id}`)}
                key={property.id}
                position={{
                  lat: property.location?.latitude || 0,
                  lng: property.location?.longitude || 0,
                }}
              />
            ))}
          </GoogleMap>
          <button
            onClick={() => {
              map?.panTo(center);
            }}
            className="group font-medium absolute bottom-6 right-14 border shadow bg-white text-black rounded-none py-2 px-4"
          >
            <Target className="text-gray-500 group-hover:text-black" />
          </button>
          <h1
            className="
          bg-secondary2 text-white py-2 px-4
          absolute bottom-5 left-1/2 -translate-x-1/2 text-4xl font-slab"
          >
            Properties for {dealType == "sale" ? "Sale" : "Rent"}
          </h1>
        </div>
      )}
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
