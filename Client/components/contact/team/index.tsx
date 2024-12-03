import React from "react";
import { team } from "@/constants";

const Team = () => {
  return (
    <div className="container py-10">
      <h1 className="text-secondary text-4xl mb-10 text-center font-slab">
        Meet Our Team
      </h1>
      <div className="flex justify-center gap-20">
        {team.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.img}
              alt={item.name}
              className="rounded-full h-44 w-44 object-cover mb-4"
            />
            <p className="text-center font-bold mb-2 text-lg">{item.name}</p>
            <a href={item.whatsapp} target="_blank" className="text-center">
              Contact on <br /> Whatsapp
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
