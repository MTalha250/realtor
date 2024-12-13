"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import img from "@/assets/product.jpg";
import { useSearchParams } from "next/navigation";
import SearchCard from "@/components/common/searchCard";
import GridThree from "@/components/grids/gridThree";
import { LayoutGrid, Rows3, Target } from "lucide-react";
import GridFour from "@/components/grids/gridFour";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { useRouter } from "next/navigation";
import {
  buildSearchQuery,
  parseSearchParams,
} from "@/components/common/searchCard/utility";
import { SearchFilters } from "@/types/searchTypes";
import axios from "axios";
const Properties = () => {
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("grid");
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 11.2403547, lng: -74.2110227 });
  const [properties, setProperties] = useState<Partial<Property>[]>([]);

  const initialFilters = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );

  const fetchProperties = useCallback(
    async (filters: Partial<SearchFilters>) => {
      const dealTypeQuery = `dealType=${filters.dealType || "sale"}`;

      const query =
        Object.keys(filters).length > 1
          ? buildSearchQuery(filters).toString()
          : dealTypeQuery;

      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/search/properties?${query}`
        );

        setProperties(response.data.data || []);

        if (filters.location?.latitude && filters.location?.longitude) {
          setCenter({
            lat: Number(filters.location.latitude),
            lng: Number(filters.location.longitude),
          });
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProperties(initialFilters);
  }, [fetchProperties, initialFilters]);

  const handleSearchComplete = useCallback(
    async (filters: SearchFilters) => {
      await fetchProperties(filters);
    },
    [fetchProperties]
  );

  return (
    <div className="pt-20">
      {isLoaded && !loading && (
        <div className="mt-1 md:mt-2 relative">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "500px",
            }}
            center={center}
            zoom={14}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            {properties.map((property) => (
              <Marker
                onClick={() => router.push(`/properties/${property.id}`)}
                key={property.id}
                position={{
                  lat: Number(property.location?.latitude) || 0,
                  lng: Number(property.location?.longitude) || 0,
                }}
              />
            ))}
          </GoogleMap>
          <button
            onClick={() => {
              map?.panTo(center);
            }}
            className="group font-medium absolute top-14 right-[0.6rem] border shadow bg-white text-black rounded-none p-2"
          >
            <Target
              className="text-gray-500 group-hover:text-black"
              size={22}
            />
          </button>
          <h1
            className="
          bg-secondary2 text-white py-2 px-4
          absolute bottom-5 left-1/2 -translate-x-1/2  text-2xl sm:text-3xl md:text-4xl font-slab text-center"
          >
            Properties for {filters.dealType == "sale" ? "Sale" : "Rent"}
          </h1>
        </div>
      )}
      <div className="container flex justify-center py-10">
        <SearchCard onSearchComplete={handleSearchComplete} />
      </div>
      <div className="container">
        <div className="hidden md:block w-full relative h-5">
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
