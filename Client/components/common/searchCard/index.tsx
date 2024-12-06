"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";

const SearchCard = () => {
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const [propertyType, setPropertyType] = useState("small-house");
  const [location, setLocation] = useState("los-angeles");
  const [priceRange, setPriceRange] = useState("50-100");
  const [filter, setFilter] = useState("sale");

  return (
    <div className="bg-white p-5 md:p-10 flex flex-wrap md:flex-nowrap gap-5 justify-between items-center w-full shadow-lg">
      <div className="flex flex-wrap gap-5 items-end w-full">
        <label className="w-full md:w-auto flex-1">
          <p className="py-2 text-sm md:text-base">Map Search</p>
          <Autocomplete>
            <Input placeholder="Search by location" />
          </Autocomplete>
        </label>

        <label className="w-full md:w-auto flex-1">
          <Select onValueChange={(e) => setPropertyType(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-sm md:text-base">
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
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 text-sm md:text-base">
            {propertyType
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </label>

        <label className="w-full md:w-auto flex-1">
          <Select onValueChange={(e) => setLocation(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-sm md:text-base">
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
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 text-sm md:text-base">
            {location
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </label>

        <label className="w-full md:w-auto flex-1">
          <Select onValueChange={(e) => setPriceRange(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-sm md:text-base">
              Price Range
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50-100">$50k - $100k</SelectItem>
              <SelectItem value="100-200">$100k - $200k</SelectItem>
              <SelectItem value="200-500">$200k - $500k</SelectItem>
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 text-sm md:text-base">
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

        <label className="w-full md:w-auto flex-1">
          <Select onValueChange={(e) => setFilter(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-sm md:text-base">
              Filter
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500 text-sm md:text-base">
            {filter[0].toUpperCase() + filter.slice(1)}
          </p>
        </label>

        <Sheet>
          <SheetTrigger className="w-fit bg-primary rounded-md border border-neutral-200 text-white px-3 py-2 whitespace-nowrap hover:bg-primary3 transition duration-300 text-sm md:text-base">
            Advance Filters
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Button
          variant="primary"
          className="text-white text-sm md:text-lg px-8 rounded-md"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchCard;
