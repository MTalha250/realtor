import React from "react";
import img from "@/assets/p1.jpg";

const Team = () => {
  return (
    <div className="container py-20">
      <h1 className="text-secondary text-4xl mb-10 text-center font-slab">
        Meet Our Team
      </h1>
      <div className="flex justify-center gap-20">
        <div className="flex flex-col items-center">
          <img
            src={img.src}
            alt=""
            className="rounded-full h-24 w-24 object-cover mb-4"
          />
          <p className="text-center font-bold mb-2 text-lg">Name</p>
          <a href="#" className="text-center">
            Contact on <br /> Whatsapp
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img.src}
            alt=""
            className="rounded-full h-24 w-24 object-cover mb-4"
          />
          <p className="text-center font-bold mb-2 text-lg">Name</p>
          <a href="#" className="text-center">
            Contact on <br /> Whatsapp
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img.src}
            alt=""
            className="rounded-full h-24 w-24 object-cover mb-4"
          />
          <p className="text-center font-bold mb-2 text-lg">Name</p>
          <a href="#" className="text-center">
            Contact on <br /> Whatsapp
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img.src}
            alt=""
            className="rounded-full h-24 w-24 object-cover mb-4"
          />
          <p className="text-center font-bold mb-2 text-lg">Name</p>
          <a href="#" className="text-center">
            Contact on <br /> Whatsapp
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={img.src}
            alt=""
            className="rounded-full h-24 w-24 object-cover mb-4"
          />
          <p className="text-center font-bold mb-2 text-lg">Name</p>
          <a href="#" className="text-center">
            Contact on <br /> Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
