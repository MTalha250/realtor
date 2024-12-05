import Link from "next/link";
import React from "react";

interface Props {
  product: Partial<Property>;
}

const CardTwo = ({ product }: Props) => {
  return (
    <Link
      href={`/properties/${product.id}`}
      className="relative rounded-xl group"
    >
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-60 sm:h-72 md:h-80 object-cover absolute top-0 left-0 rounded-xl"
      />
      <div className="w-full absolute left-0 bottom-0 p-4 sm:p-5">
        <div className="bg-white rounded-lg p-4 sm:p-5 group-hover:scale-105 transition duration-300">
          <div className="flex flex-col sm:flex-row justify-between">
            <h1 className="font-bold mb-2 w-full sm:w-2/3 text-center sm:text-left">
              {product.title}
            </h1>
            <span className="font-bold text-secondary text-center sm:text-left">
              {product.category
                ? product.category[0].toUpperCase() + product.category.slice(1)
                : ""}
            </span>
          </div>
          <p className="text-sm text-center sm:text-left line-clamp-2 mt-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardTwo;
