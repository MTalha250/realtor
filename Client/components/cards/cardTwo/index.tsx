import React from "react";

interface Props {
  product: Partial<Product>;
}
const CardTwo = ({ product }: Props) => {
  return (
    <div className="relative rounded-xl h-60">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-full object-cover absolute top-0 left-0 rounded-xl"
      />
      <div className="w-full absolute left-0 bottom-0 p-5">
        <div className="bg-white rounded-lg p-5 hover:scale-105 transition duration-300">
          <div className="flex justify-between">
            <h1 className="font-bold mb-2 w-2/3">{product.title}</h1>
            <span className="font-bold text-secondary">
              {product.dealType
                ? product.dealType[0].toUpperCase() + product.dealType.slice(1)
                : ""}
            </span>
          </div>
          <p className="text-sm text-center line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
