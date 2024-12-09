"use client";
import React, { useRef, useState } from "react";
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
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Autocomplete } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
//@ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useRouter, useSearchParams } from "next/navigation";

const SearchCard = () => {
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const searchParams = useSearchParams();
  const dealType = searchParams.get("dealType");
  const locationParam = searchParams.get("location");
  const radiusParam = searchParams.get("radius");
  const propertyTypeParam = searchParams.get("propertyType");
  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");
  const bedsParam = searchParams.get("beds");
  const bathsParam = searchParams.get("baths");
  const viewsParam = searchParams.get("views");
  const outdoorParam = searchParams.get("outdoor");
  const propertyStyleParam = searchParams.get("propertyStyle");
  const leaseTermParam = searchParams.get("leaseTerm");
  const floorsParam = searchParams.get("floors");
  const noiseLevelParam = searchParams.get("noiseLevel");
  const laundryParam = searchParams.get("laundry");
  const securityFeaturesParam = searchParams.get("securityFeatures");
  const amenitiesParam = searchParams.get("amenities");
  const internetParam = searchParams.get("internet");
  const heatingParam = searchParams.get("heating");
  const coolingParam = searchParams.get("cooling");
  const router = useRouter();
  interface Location {
    longitude: number;
    latitude: number;
    region: string;
  }

  const [location, setLocation] = useState<Location>(
    locationParam
      ? JSON.parse(locationParam)
      : {
          longitude: 0,
          latitude: 0,
          region: "",
        }
  );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat();
        const lng = place.geometry.location?.lng();

        const addressComponents = place.address_components;

        const area = addressComponents?.find(
          (component) =>
            component.types.includes("sublocality") ||
            component.types.includes("locality")
        )?.long_name;

        const city = addressComponents?.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
        )?.long_name;

        const country = addressComponents?.find((component) =>
          component.types.includes("country")
        )?.long_name;

        const region = `${area || ""}, ${city || ""}, ${country || ""}`
          .replace(/, , /g, ", ")
          .replace(/, $/, "");
        if (lat !== undefined && lng !== undefined) {
          setLocation({ latitude: lat, longitude: lng, region });
        }
      } else {
        console.log("No geometry information available for the place.");
      }
    }
  };
  const [propertyType, setPropertyType] = useState<string[]>(
    propertyTypeParam ? JSON.parse(propertyTypeParam) : []
  );
  const [radius, setRadius] = useState<string>(radiusParam || "");
  const [min, setMin] = useState<number>(Number(minParam) || 50);
  const [max, setMax] = useState<number>(Number(maxParam) || 500);
  const [minPrice, setMinPrice] = useState<number>(50);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [beds, setBeds] = useState<string[]>(
    bedsParam ? JSON.parse(bedsParam) : []
  );
  const [baths, setBaths] = useState<string[]>(
    bathsParam ? JSON.parse(bathsParam) : []
  );
  const [views, setViews] = useState<string[]>(
    viewsParam ? JSON.parse(viewsParam) : []
  );
  const [outdoor, setOutdoor] = useState<string[]>(
    outdoorParam ? JSON.parse(outdoorParam) : []
  );
  const [propertyStyle, setPropertyStyle] = useState<string[]>(
    propertyStyleParam ? JSON.parse(propertyStyleParam) : []
  );
  const [leaseTerm, setLeaseTerm] = useState<string[]>(
    leaseTermParam ? JSON.parse(leaseTermParam) : []
  );
  const [floors, setFloors] = useState<string[]>(
    floorsParam ? JSON.parse(floorsParam) : []
  );
  const [noiseLevel, setNoiseLevel] = useState<string[]>(
    noiseLevelParam ? JSON.parse(noiseLevelParam) : []
  );
  const [laundry, setLaundry] = useState<string[]>(
    laundryParam ? JSON.parse(laundryParam) : []
  );
  const [securityFeatures, setSecurityFeatures] = useState<string[]>(
    securityFeaturesParam ? JSON.parse(securityFeaturesParam) : []
  );
  const [amenities, setAmenities] = useState<string[]>(
    amenitiesParam ? JSON.parse(amenitiesParam) : []
  );
  const [internet, setInternet] = useState<string[]>(
    internetParam ? JSON.parse(internetParam) : []
  );
  const [heating, setHeating] = useState<string[]>(
    heatingParam ? JSON.parse(heatingParam) : []
  );
  const [cooling, setCooling] = useState<string[]>(
    coolingParam ? JSON.parse(coolingParam) : []
  );

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (dealType) query.append("dealType", dealType);
    if (location.latitude && location.longitude && location.region)
      query.append("location", JSON.stringify(location));
    if (radius) query.append("radius", radius);
    if (propertyType.length > 0)
      query.append("propertyType", JSON.stringify(propertyType));
    if (min) query.append("min", min.toString());
    if (max) query.append("max", max.toString());
    if (beds.length > 0) query.append("beds", JSON.stringify(beds));
    if (baths.length > 0) query.append("baths", JSON.stringify(baths));
    if (views.length > 0) query.append("views", JSON.stringify(views));
    if (outdoor.length > 0) query.append("outdoor", JSON.stringify(outdoor));
    if (propertyStyle.length > 0)
      query.append("propertyStyle", JSON.stringify(propertyStyle));
    if (leaseTerm.length > 0)
      query.append("leaseTerm", JSON.stringify(leaseTerm));
    if (floors.length > 0) query.append("floors", JSON.stringify(floors));
    if (noiseLevel.length > 0)
      query.append("noiseLevel", JSON.stringify(noiseLevel));
    if (laundry.length > 0) query.append("laundry", JSON.stringify(laundry));
    if (securityFeatures.length > 0)
      query.append("securityFeatures", JSON.stringify(securityFeatures));
    if (amenities.length > 0)
      query.append("amenities", JSON.stringify(amenities));
    if (internet.length > 0) query.append("internet", JSON.stringify(internet));
    if (heating.length > 0) query.append("heating", JSON.stringify(heating));
    if (cooling.length > 0) query.append("cooling", JSON.stringify(cooling));
    router.push(`/properties?${query.toString()}`);
  };

  return (
    <div className="bg-white p-10 flex justify-between items-center w-full shadow-lg">
      <div className="flex gap-5 items-end w-full">
        <label className="w-full">
          <p className="py-2">Location</p>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input placeholder="Search by location" />
          </Autocomplete>
        </label>
        <label className="w-full">
          <Select onValueChange={(e) => setRadius(e)}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
              Radius
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 miles</SelectItem>
              <SelectItem value="10">10 miles</SelectItem>
              <SelectItem value="20">20 miles</SelectItem>
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
            {radius ? radius : "Select"} miles
          </p>
        </label>
        <label className="w-full">
          <Select onValueChange={(e) => setPropertyType([e])}>
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
              Property Type
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Small House">Small House</SelectItem>
              <SelectItem value="Beach House">Beach House</SelectItem>
              <SelectItem value="Condo">Condo</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
            {propertyType.length > 0
              ? propertyType.join(", ").slice(0, 16) +
                (propertyType.length > 1 ? "..." : "")
              : "Select Property Type"}
          </p>
        </label>
        <label className="w-full">
          <Select
            onValueChange={(e) => {
              setMin(Number(e.split("-")[0]));
              setMax(Number(e.split("-")[1]));
            }}
          >
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
              Price Range
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50-100">$50k - $100k</SelectItem>
              <SelectItem value="100-200">$100k - $200k</SelectItem>
              <SelectItem value="200-500">$200k - $500k</SelectItem>
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
            ${min}k - ${max}k
          </p>
        </label>
        <Sheet>
          <SheetTrigger className="w-fit bg-primary rounded-md border border-neutral-200 text-white px-3 py-2 whitespace-nowrap hover:bg-primary3 transition duration-300">
            Advance Filters
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="mb-5 text-center text-secondary font-bold text-3xl">
              Advance Filters
            </SheetTitle>
            <div className="flex flex-col h-full gap-3 overflow-y-scroll scrollbar scrollbar-none pb-20">
              <label className="w-full">
                <p className="py-2 font-semibold text-primary">Location</p>
                <Autocomplete
                  onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                  }
                  onPlaceChanged={handlePlaceChanged}
                >
                  <Input placeholder="Search by location" />
                </Autocomplete>
              </label>
              <label className="w-full">
                <Select onValueChange={(e) => setRadius(e)}>
                  <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 font-semibold text-primary text-base">
                    Radius
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 miles</SelectItem>
                    <SelectItem value="10">10 miles</SelectItem>
                    <SelectItem value="20">20 miles</SelectItem>
                  </SelectContent>
                </Select>
                <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
                  {radius ? radius : "Select"} miles
                </p>
              </label>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Property Type
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Small House",
                    "Beach House",
                    "Condo",
                    "Apartment",
                    "Commercial",
                  ].map((type) => (
                    <button
                      className={
                        propertyType.includes(type)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setPropertyType((prev) =>
                          prev.includes(type)
                            ? prev.filter((v) => v !== type)
                            : [...prev, type]
                        )
                      }
                      key={type}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 py-2 font-semibold text-primary text-base">
                  Price Range (in $k)
                </p>
                <div id="range" className="mb-4">
                  <RangeSlider
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    value={[min, max]}
                    onInput={(value: any) => {
                      setMin(value[0]);
                      setMax(value[1]);
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={min}
                    onChange={(e) => {
                      const value = +e.target.value;
                      if (value <= max && value >= minPrice) setMin(value);
                    }}
                    className="border border-black rounded-none w-1/2 p-2 outline-none placeholder:font-light font-light"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={max}
                    onChange={(e) => {
                      const value = +e.target.value;
                      if (value >= min && value <= maxPrice) setMax(value);
                    }}
                    className="border border-black rounded-none w-1/2 p-2 outline-none placeholder:font-light font-light"
                  />
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Bedrooms
                </p>
                <div className="flex flex-wrap gap-3">
                  {["1", "2", "3", "4", "4+"].map((bed) => (
                    <button
                      className={
                        beds.includes(bed)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setBeds((prev) =>
                          prev.includes(bed)
                            ? prev.filter((v) => v !== bed)
                            : [...prev, bed]
                        )
                      }
                      key={bed}
                    >
                      {bed}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Bathrooms
                </p>
                <div className="flex flex-wrap gap-3">
                  {["1", "2", "3", "4", "4+"].map((bath) => (
                    <button
                      className={
                        baths.includes(bath)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setBaths((prev) =>
                          prev.includes(bath)
                            ? prev.filter((v) => v !== bath)
                            : [...prev, bath]
                        )
                      }
                      key={bath}
                    >
                      {bath}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Views
                </p>
                <div className="flex flex-wrap gap-3">
                  {["City", "Mountain", "Water", "Park"].map((view) => (
                    <button
                      className={
                        views.includes(view)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setViews((prev) =>
                          prev.includes(view)
                            ? prev.filter((v) => v !== view)
                            : [...prev, view]
                        )
                      }
                      key={view}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Outdoor
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Balcony", "Garden", "Pool", "Patio"].map((out) => (
                    <button
                      className={
                        outdoor.includes(out)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setOutdoor((prev) =>
                          prev.includes(out)
                            ? prev.filter((v) => v !== out)
                            : [...prev, out]
                        )
                      }
                      key={out}
                    >
                      {out}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Property Style
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Modern", "Classic", "Contemporary", "Colonial"].map(
                    (style) => (
                      <button
                        className={
                          propertyStyle.includes(style)
                            ? "py-2 px-3 bg-primary text-white"
                            : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                        }
                        onClick={() =>
                          setPropertyStyle((prev) =>
                            prev.includes(style)
                              ? prev.filter((v) => v !== style)
                              : [...prev, style]
                          )
                        }
                        key={style}
                      >
                        {style}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Lease Term
                </p>
                <div className="flex flex-wrap gap-3">
                  {["1 year", "6 months", "3 months", "1 month"].map((term) => (
                    <button
                      className={
                        leaseTerm.includes(term)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setLeaseTerm((prev) =>
                          prev.includes(term)
                            ? prev.filter((v) => v !== term)
                            : [...prev, term]
                        )
                      }
                      key={term}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Floors
                </p>
                <div className="flex flex-wrap gap-3">
                  {["1", "2", "3", "4", "4+"].map((floor) => (
                    <button
                      className={
                        floors.includes(floor)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setFloors((prev) =>
                          prev.includes(floor)
                            ? prev.filter((v) => v !== floor)
                            : [...prev, floor]
                        )
                      }
                      key={floor}
                    >
                      {floor}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Noise Level
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Low", "Medium", "High"].map((noise) => (
                    <button
                      className={
                        noiseLevel.includes(noise)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setNoiseLevel((prev) =>
                          prev.includes(noise)
                            ? prev.filter((v) => v !== noise)
                            : [...prev, noise]
                        )
                      }
                      key={noise}
                    >
                      {noise}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Laundry
                </p>
                <div className="flex flex-wrap gap-3">
                  {["In Unit", "On Site", "None"].map((laund) => (
                    <button
                      className={
                        laundry.includes(laund)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setLaundry((prev) =>
                          prev.includes(laund)
                            ? prev.filter((v) => v !== laund)
                            : [...prev, laund]
                        )
                      }
                      key={laund}
                    >
                      {laund}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Security Features
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Gated", "Security Guard", "Alarm System"].map((sec) => (
                    <button
                      className={
                        securityFeatures.includes(sec)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setSecurityFeatures((prev) =>
                          prev.includes(sec)
                            ? prev.filter((v) => v !== sec)
                            : [...prev, sec]
                        )
                      }
                      key={sec}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Amenities
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Pool", "Gym", "Parking", "Elevator"].map((amen) => (
                    <button
                      className={
                        amenities.includes(amen)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setAmenities((prev) =>
                          prev.includes(amen)
                            ? prev.filter((v) => v !== amen)
                            : [...prev, amen]
                        )
                      }
                      key={amen}
                    >
                      {amen}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Internet
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Fiber", "Cable", "DSL"].map((net) => (
                    <button
                      className={
                        internet.includes(net)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setInternet((prev) =>
                          prev.includes(net)
                            ? prev.filter((v) => v !== net)
                            : [...prev, net]
                        )
                      }
                      key={net}
                    >
                      {net}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Heating
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Electric", "Gas", "Oil"].map((heat) => (
                    <button
                      className={
                        heating.includes(heat)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setHeating((prev) =>
                          prev.includes(heat)
                            ? prev.filter((v) => v !== heat)
                            : [...prev, heat]
                        )
                      }
                      key={heat}
                    >
                      {heat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Cooling
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Central", "Window", "Split"].map((cool) => (
                    <button
                      className={
                        cooling.includes(cool)
                          ? "py-2 px-3 bg-primary text-white"
                          : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
                      }
                      onClick={() =>
                        setCooling((prev) =>
                          prev.includes(cool)
                            ? prev.filter((v) => v !== cool)
                            : [...prev, cool]
                        )
                      }
                      key={cool}
                    >
                      {cool}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                variant="primary"
                onClick={handleSearch}
                className="text-white text-lg px-8 rounded-md mt-5"
              >
                Search
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <Button
          variant="primary"
          onClick={handleSearch}
          className="text-white text-lg px-8 rounded-md"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchCard;
