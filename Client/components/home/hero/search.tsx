"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const SearchCard = () => {
  const [propertyType, setPropertyType] = useState("small-house");
  const [location, setLocation] = useState("los-angeles");
  const [priceRange, setPriceRange] = useState("50-100");
  const [filter, setFilter] = useState("sale");
  return (
    <div className="bg-white p-10 flex justify-between items-center w-[90%] shadow-lg">
      <div className="flex gap-20 items-center">
        <label>
          <Select onValueChange={(e) => setPropertyType(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-lg">
              Property Type
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small-house">Small House</SelectItem>
              <SelectItem value="beach-house">Beach House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
          <p className="font-semibold text-xl">
            {propertyType
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </label>
        <label>
          <Select onValueChange={(e) => setLocation(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-lg">
              Location
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="miami">Miami</SelectItem>
              <SelectItem value="san-francisco">San Francisco</SelectItem>
              <SelectItem value="seattle">Seattle</SelectItem>
            </SelectContent>
          </Select>
          <p className="font-semibold text-xl">
            {" "}
            {location
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </label>
        <label>
          <Select onValueChange={(e) => setPriceRange(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-lg">
              Price Range
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50-100">$50k - $100k</SelectItem>
              <SelectItem value="100-200">$100k - $200k</SelectItem>
              <SelectItem value="200-500">$200k - $500k</SelectItem>
            </SelectContent>
          </Select>
          <p className="font-semibold text-xl">
            {priceRange
              .split("-")
              .map((word) => {
                if (word === "50") return "$50k";
                if (word === "100") return "$100k";
                if (word === "200") return "$200k";
                if (word === "500") return "$500k";
              })
              .join(" - ")}
          </p>
        </label>
        <label>
          <Select onValueChange={(e) => setFilter(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-lg">
              Filter
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
          <p className="font-semibold text-xl">
            {filter[0].toUpperCase() + filter.slice(1)}
          </p>
        </label>
      </div>
      <Button variant="primary" className="rounded-none text-lg py-8 px-10">
        Search Property
      </Button>
    </div>
  );
};

export default SearchCard;
