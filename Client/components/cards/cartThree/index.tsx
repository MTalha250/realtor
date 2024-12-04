import React from "react";
import { MapPin, Bed, Bath, LandPlot, Heart } from "lucide-react";
import Link from "next/link";

interface Props {
  product: Partial<Property>;
}
const CardThree = ({ product }: Props) => {
  return (
    <Link
      href={`/properties/${product.id}`}
      className="relative p-5 flex bg-white gap-10 hover:scale-105 transition duration-300"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="h-[35vh] w-96 object-cover"
      />
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
        <p className="text-gray-500 text-lg mb-4 line-clamp-2">
          {product.description}
        </p>
        <p className="text-gray-500 flex items-center gap-3 text-lg mb-4">
          <MapPin strokeWidth={0.75} />
          <span>{product.location?.region}</span>
        </p>
        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-2 bg-neutral-200 rounded-full p-3">
            <Bed strokeWidth={0.75} />
            <span>{product.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-200 rounded-full p-3">
            <Bath strokeWidth={0.75} />
            <span>{product.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-200 rounded-full p-3">
            <LandPlot strokeWidth={0.75} />
            <span>{product.area} sqft</span>
          </div>
        </div>
        <p className="text-2xl">
          $ {product.price?.toLocaleString()} /{" "}
          <span className="text-gray-500 text-base">{product.priceType}</span>
        </p>
      </div>
      <button className="p-3 rounded-full border absolute bottom-5 right-5">
        <Heart strokeWidth={0.75} size={30} />
      </button>
    </Link>
  );
};

export default CardThree;
