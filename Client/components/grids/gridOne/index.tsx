import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardOne from "@/components/cards/cardOne";

interface Props {
  products: Partial<Property>[];
  loading: boolean;
}

const GridOne = ({ products, loading }: Props) => {
  return loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10 min-h-screen">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="rounded-2xl" />
      ))}
    </div>
  ) : products.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10 min-h-screen">
      {products.map((product) => (
        <CardOne key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
      <span>No properties found</span>
    </div>
  );
};

export default GridOne;
