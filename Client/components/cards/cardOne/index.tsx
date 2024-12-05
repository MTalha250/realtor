import Link from "next/link";
import React from "react";
import { Bed, Bath, LandPlot } from "lucide-react";

interface Props {
  product: Partial<Property>;
}

const CardOne = ({ product }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:scale-105 transition duration-300">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-40 sm:h-60 object-cover rounded-xl mb-4"
      />
      <h1 className="text-lg sm:text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
        {product.description}
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
        <p className="text-base sm:text-xl font-semibold">
          ${product.price?.toLocaleString()}
        </p>
        <Link
          href={`/properties/${product.id}`}
          className="bg-primary text-white px-4 py-2 rounded-md text-xs sm:text-sm hover:bg-primary3 transition duration-300"
        >
          View More
        </Link>
      </div>
      <div className="flex flex-wrap justify-between text-[10px] sm:text-xs gap-3">
        <div className="flex items-center gap-1">
          <Bed strokeWidth={0.75} size={16}  />
          <span>{product.bedrooms} Bedrooms</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath strokeWidth={0.75} size={16}  />
          <span>{product.bathrooms} Bathrooms</span>
        </div>
        <div className="flex items-center gap-1">
          <LandPlot strokeWidth={0.75} size={16}  />
          <span>{product.area} sqft</span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
