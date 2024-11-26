import { Button } from "@/components/ui/button";
import React from "react";

const Map = () => {
  return (
    <div className="py-10">
      <h2 className="text-4xl font-slab mb-5">Explore The Area</h2>
      <p className="mb-5">
        Tallentire, Cockermouth, Tallentire, England, United Kingdom.
      </p>
      <div className="w-full h-[50vh] bg-white"></div>
      <Button className="mt-5 text-white rounded-none" variant="primary">
        Request Location Information
      </Button>
    </div>
  );
};

export default Map;
