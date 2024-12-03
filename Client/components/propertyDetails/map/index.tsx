import { Button } from "@/components/ui/button";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

interface Props {
  latitude: number;
  longitude: number;
  region: string;
}

const Map = ({ latitude, longitude, region }: Props) => {
  const { isLoaded } = useGoogleMapsStore();
  return (
    <div className="py-10">
      <h2 className="text-4xl font-slab mb-5">Explore The Area</h2>
      <p className="mb-5">{region}</p>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: latitude, lng: longitude }}
          zoom={15}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      )}
      <Button className="mt-5 text-white rounded-none" variant="primary">
        Request Location Information
      </Button>
    </div>
  );
};

export default Map;
