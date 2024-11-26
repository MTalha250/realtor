import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone } from "lucide-react";
import whatsapp from "@/assets/whatsapp.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  property: Property;
}

const Main = ({ property }: Props) => {
  return (
    <div className="flex gap-5 py-10">
      <div className="w-2/3">
        <h1 className="text-5xl font-slab font-light mb-5">{property.title}</h1>
        <p className="mb-5 text-xl font-light">
          {property.bedrooms} bedrooms . {property.bathrooms} bathrooms .{" "}
          {property.area} sqft
        </p>
        <p className="mb-5">{property.description}</p>
        <p className="mb-5 text-xl font-light">
          Last Updated:{" "}
          {new Date(property.updatedAt).toLocaleDateString() ===
          new Date().toLocaleDateString()
            ? "Today"
            : new Date(property.updatedAt).toLocaleDateString() ===
              new Date(
                new Date().setDate(new Date().getDate() - 1)
              ).toLocaleDateString()
            ? "Yesterday"
            : new Date(property.updatedAt).toLocaleDateString()}{" "}
          . Views {property.views} . Likes {property.likes}
        </p>
      </div>
      <div className="w-1/3 border border-black p-10">
        <div className="flex gap-5 mb-4">
          <Avatar>
            <AvatarImage
              src="https://res.cloudinary.com/dewqsghdi/image/upload/v1732596415/image_255_glmcbg.svg"
              className="bg-gray-200"
            />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="mb-2 font-bold">Fine & Country Cumbria</h2>
            <p className="mb-2">1 year with realtor</p>
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <Phone size={24} strokeWidth={0.75} />
                <span>Call Now</span>
              </div>
              <div className="flex gap-2 items-center">
                <img src={whatsapp.src} alt="whatsapp" className="w-6" />
                <span>Chat Now</span>
              </div>
            </div>
          </div>
        </div>
        <form className="gap-2 flex flex-col">
          <Input
            type="text"
            placeholder="Name"
            className="bg-transparent rounded-none border-black placeholder:text-primary"
          />
          <Input
            type="text"
            placeholder="Email"
            className="bg-transparent rounded-none border-black placeholder:text-primary"
          />
          <Input
            type="text"
            placeholder="Phone"
            className="bg-transparent rounded-none border-black placeholder:text-primary"
          />
          <Textarea
            placeholder="Message"
            className="bg-transparent rounded-none border-black placeholder:text-primary"
          />
          <Button variant="primary" className="text-white rounded-none mx-auto">
            Contact Agent
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Main;
