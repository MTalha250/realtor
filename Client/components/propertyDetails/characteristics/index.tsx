import React from "react";

interface Props {
  characteristics: string[];
}

const Characteristics = (characteristics: Props) => {
  return (
    <div className="py-10 border-y border-black">
      <h2 className="text-4xl font-slab mb-5">Characteristics</h2>
      <div className="flex flex-wrap gap-5">
        {characteristics.characteristics.map((characteristic, index) => (
          <div key={index} className="bg-primary4 text-white p-5 rounded-lg">
            <span className="text-lg font-slab">{characteristic}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characteristics;
