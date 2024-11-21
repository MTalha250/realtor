import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardFour from "@/components/cards/cardFour";

interface Props {
  products: Partial<Product>[];
  loading: boolean;
}

const GridFour = ({ products, loading }: Props) => {
  return loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} className="rounded-xl h-[60vh]" />
      ))}
    </div>
  ) : products.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {products.map((product) => (
        <CardFour key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
      <span>No properties found</span>
    </div>
  );
};

export default GridFour;
