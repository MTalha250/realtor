import React from "react";
import { MapPin, Bed, Bath, LandPlot, Heart } from "lucide-react";
import Link from "next/link";

interface Props {
  product: Partial<Property>;
}

const CardFour = ({ product }: Props) => {
  return (
    <Link
      href={`/properties/${product.id}`}
      className="rounded-2xl border border-white bg-white overflow-hidden hover:scale-105 transition duration-300"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-60 sm:h-72 md:h-80 object-cover"
      />
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base mb-4 line-clamp-2">
          {product.description}
        </p>
        <p className="text-gray-500 flex items-center gap-1 mb-4">
          <MapPin strokeWidth={0.75} size={18} />
          <span className="text-xs sm:text-sm">{product.location?.region}</span>
        </p>
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1 bg-neutral-200 rounded-full p-2 sm:p-3">
            <Bed strokeWidth={0.75} size={18} />
            <span className="text-xs sm:text-sm">{product.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-200 rounded-full p-2 sm:p-3">
            <Bath strokeWidth={0.75} size={18} />
            <span className="text-xs sm:text-sm">
              {product.bathrooms} Baths
            </span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-200 rounded-full p-2 sm:p-3">
            <LandPlot strokeWidth={0.75} size={18} />
            <span className="text-xs sm:text-sm">{product.area} sqft</span>
          </div>
        </div>
        <div className="pt-4 sm:pt-5 border-t flex justify-between items-center">
          <div>
            <p className="text-lg sm:text-xl font-semibold">
              $ {product.price?.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              {product.priceType}
            </p>
          </div>
          <button className="p-2 sm:p-3 rounded-full border">
            <Heart strokeWidth={0.75} size={24} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CardFour;
