import Link from "next/link";
import React from "react";
import { Bed, Bath, LandPlot } from "lucide-react";

interface Props {
  product: Partial<Product>;
}

const CardOne = ({ product }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:scale-105 transition duration-300">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-60 object-cover rounded-xl mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center mb-8">
        <p className="text-xl font-semibold">
          ${product.price?.toLocaleString()}
        </p>
        <Link
          href={`/properties/${product.id}`}
          className="bg-primary text-white p-2 rounded-md text-sm hover:bg-primary3 transition duration-300"
        >
          View More{" "}
        </Link>
      </div>
      <div className="flex justify-between text-[10px]">
        <div className="flex items-center gap-1">
          <Bed strokeWidth={0.75} size={20} />
          <span>{product.bedrooms} Bedrooms</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath strokeWidth={0.75} size={20} />
          <span>{product.bathrooms} Bathrooms</span>
        </div>
        <div className="flex items-center gap-1">
          <LandPlot strokeWidth={0.75} size={20} />
          <span>{product.area} sqft</span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
