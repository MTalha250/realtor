import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CardThree from "@/components/cards/cartThree";

interface Props {
  products: Partial<Product>[];
  loading: boolean;
}

const GridThree = ({ products, loading }: Props) => {
  return loading ? (
    <div className="flex flex-col gap-10 my-10">
      {[...Array(9)].map((_, index) => (
        <Skeleton key={index} className="w-full h-60 rounded-none" />
      ))}
    </div>
  ) : products.length > 0 ? (
    <div className="flex flex-col gap-10 my-10">
      {products.map((product) => (
        <CardThree key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-center text-lg text-gray-600 tracking-wide">
      <span>No properties found</span>
    </div>
  );
};

export default GridThree;
