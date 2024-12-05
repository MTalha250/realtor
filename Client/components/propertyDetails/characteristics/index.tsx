import React from "react";

interface Props {
  characteristics: string[];
}

const Characteristics = ({ characteristics }: Props) => {
  return (
    <div className="py-10 px-4 sm:px-8">
      <h2 className="text-3xl sm:text-4xl font-slab mb-5">Characteristics</h2>
      <div className="flex flex-wrap gap-5">
        {characteristics.map((characteristic, index) => (
          <div
            key={index}
            className="bg-primary4 text-white p-3 sm:p-5 rounded-lg w-full sm:w-1/2 lg:w-1/3"
          >
            <span className="text-base sm:text-lg font-slab">
              {characteristic}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characteristics;
