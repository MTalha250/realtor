"use client";
import React, { useRef, useState, useCallback, useMemo } from "react";
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
  SheetClose,
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
import {
  PROPERTY_TYPES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  VIEW_OPTIONS,
  OUTDOOR_OPTIONS,
  PROPERTY_STYLES,
  LEASE_TERMS,
  FLOOR_OPTIONS,
  NOISE_LEVELS,
  LAUNDRY_OPTIONS,
  SECURITY_FEATURES,
  AMENITIES,
  INTERNET_TYPES,
  HEATING_TYPES,
  COOLING_TYPES,
  RADIUS_OPTIONS,
  PRICE_RANGES,
} from "@/constants";
import { SearchCardProps, SearchFilters, Location } from "@/types/searchTypes";
import {
  parseSearchParams,
  buildSearchQuery,
} from "@/components/common/searchCard/utility";

// Reusable Filter Button Component
const FilterButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, isSelected, onClick }) => (
  <button
    aria-label={`Select ${label}`}
    role="checkbox"
    aria-checked={isSelected}
    className={
      isSelected
        ? "py-2 px-3 bg-primary text-white"
        : "py-2 px-3 bg-gray-300 hover:bg-secondary2"
    }
    onClick={onClick}
  >
    {label}
  </button>
);

const SearchCard: React.FC<SearchCardProps> = ({ onSearchComplete }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Parse initial search params
  const initialFilters = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );
  // State management with type safety
  const [location, setLocation] = useState<Location>(
    initialFilters.location || {
      longitude: 0,
      latitude: 0,
      region: "",
    }
  );

  const [filters, setFilters] = useState<SearchFilters>({
    dealType: initialFilters.dealType || "",
    propertyType: initialFilters.propertyType || [],
    minPrice: initialFilters.minPrice || 50,
    maxPrice: initialFilters.maxPrice || 500,
    radius: initialFilters.radius || "",
    beds: initialFilters.beds || [],
    baths: initialFilters.baths || [],
    views: initialFilters.views || [],
    outdoor: initialFilters.outdoor || [],
    propertyStyle: initialFilters.propertyStyle || [],
    leaseTerm: initialFilters.leaseTerm || [],
    floors: initialFilters.floors || [],
    noiseLevel: initialFilters.noiseLevel || [],
    laundry: initialFilters.laundry || [],
    securityFeatures: initialFilters.securityFeatures || [],
    amenities: initialFilters.amenities || [],
    internet: initialFilters.internet || [],
    heating: initialFilters.heating || [],
    cooling: initialFilters.cooling || [],
    location: location,
  });

  // Handle place selection with error handling
  const handlePlaceChanged = useCallback(() => {
    try {
      if (autocompleteRef.current) {
        const place = autocompleteRef.current.getPlace();

        if (!place.geometry) {
          throw new Error("No geometry information available");
        }

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
          const newLocation = {
            latitude: lat,
            longitude: lng,
            region,
          };

          setLocation(newLocation);
          setFilters((prev) => ({ ...prev, location: newLocation }));
        }
      }
    } catch (error) {
      console.error("Error selecting place:", error);
      // Consider adding user-friendly error toast/notification
    }
  }, []);

  // Generic filter update method
  const updateFilter = useCallback(
    <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Toggle array-based filters
  const toggleArrayFilter = useCallback(
    <K extends keyof SearchFilters>(
      key: K,
      item: SearchFilters[K] extends Array<infer U> ? U : never
    ) => {
      setFilters((prev) => {
        const currentArray = prev[key] as Array<unknown>;
        const newArray = currentArray.includes(item)
          ? currentArray.filter((v) => v !== item)
          : [...currentArray, item];
        return { ...prev, [key]: newArray };
      });
    },
    []
  );

  // Handle search with validation
  const handleSearch = useCallback(() => {
    let updatedFilters = { ...filters };
    if (location.latitude > 0 && location.longitude > 0)
      updatedFilters = { ...filters, location };
    else updatedFilters = { ...filters, location: undefined };

    const query = buildSearchQuery(updatedFilters);

    // Optional callback for external handling
    onSearchComplete?.(updatedFilters);

    // Navigate to properties page with search params
    router.push(`/properties?${query.toString()}`);
  }, [filters, location, router, onSearchComplete]);

  return (
    <div className="bg-white p-10 flex justify-between items-center w-full shadow-lg">
      <div className="flex gap-5 items-end w-full">
        {/* Location Autocomplete */}
        <label className="w-full">
          <p className="py-2">Location</p>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged}
          >
            <Input
              placeholder="Search by location"
              aria-label="Location search"
            />
          </Autocomplete>
        </label>

        {/* Radius Select */}
        <label className="w-full">
          <Select
            onValueChange={(e) => updateFilter("radius", e)}
            value={filters.radius}
          >
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
              Radius
            </SelectTrigger>
            <SelectContent>
              {RADIUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
            {filters.radius ? filters.radius : "Select"} miles
          </p>
        </label>

        {/* Property Type Select */}
        <label className="w-full">
          <Select
            onValueChange={(e) =>
              updateFilter("propertyType", [
                e as (typeof PROPERTY_TYPES)[number],
              ])
            }
            value={filters.propertyType[0]}
          >
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
              Property Type
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
            {filters.propertyType.length > 0
              ? filters.propertyType.join(", ").slice(0, 16) +
                (filters.propertyType.length > 1 ? "..." : "")
              : "Select Property Type"}
          </p>
        </label>

        {/* Price Range Select */}
        <label className="w-full">
          <Select
            onValueChange={(e) => {
              const [min, max] = e.split("-").map(Number);
              updateFilter("minPrice", min);
              updateFilter("maxPrice", max);
            }}
            value={`${filters.minPrice}-${filters.maxPrice}`}
          >
            <SelectTrigger className="border-none gap-2 focus:ring-0 p-0 text-base">
              Price Range
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-500">
            ${filters.minPrice}k - ${filters.maxPrice}k
          </p>
        </label>

        {/* Advance Filters Sheet */}
        <Sheet>
          <SheetTrigger className="w-fit bg-primary rounded-md border border-neutral-200 text-white px-3 py-2 whitespace-nowrap hover:bg-primary3 transition duration-300">
            Advance Filters
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="mb-5 text-center text-secondary font-bold text-3xl">
              Advance Filters
            </SheetTitle>
            <div className="flex flex-col h-full gap-3 overflow-y-scroll scrollbar scrollbar-none pb-12">
              {/* Property Type Filter */}
              <div>
                <p className="py-2 font-semibold text-primary">Property Type</p>
                <div className="flex flex-wrap gap-3">
                  {PROPERTY_TYPES.map((type) => (
                    <FilterButton
                      key={type}
                      label={type}
                      isSelected={filters.propertyType.includes(type)}
                      onClick={() => toggleArrayFilter("propertyType", type)}
                    />
                  ))}
                </div>
              </div>
              {/* Price Range Filter */}
              <div>
                <p className="mb-2 py-2 font-semibold text-primary text-base">
                  Price Range (in $k)
                </p>
                <div id="range" className="mb-4">
                  <RangeSlider
                    min={50}
                    max={500}
                    step={1}
                    value={[filters.minPrice, filters.maxPrice]}
                    onInput={(value: [number, number]) => {
                      updateFilter("minPrice", value[0]);
                      updateFilter("maxPrice", value[1]);
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => {
                      const value = +e.target.value;
                      if (value <= filters.maxPrice && value >= 50) {
                        updateFilter("minPrice", value);
                      }
                    }}
                    className="border border-black rounded-none w-1/2 p-2 outline-none placeholder:font-light font-light"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => {
                      const value = +e.target.value;
                      if (value >= filters.minPrice && value <= 500) {
                        updateFilter("maxPrice", value);
                      }
                    }}
                    className="border border-black rounded-none w-1/2 p-2 outline-none placeholder:font-light font-light"
                  />
                </div>
              </div>
              {/* Bedrooms Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Bedrooms
                </p>
                <div className="flex flex-wrap gap-3">
                  {BEDROOM_OPTIONS.map((bed) => (
                    <FilterButton
                      key={bed}
                      label={bed}
                      isSelected={filters.beds.includes(bed)}
                      onClick={() => toggleArrayFilter("beds", bed)}
                    />
                  ))}
                </div>
              </div>
              {/* Bathrooms Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Bathrooms
                </p>
                <div className="flex flex-wrap gap-3">
                  {BATHROOM_OPTIONS.map((bath) => (
                    <FilterButton
                      key={bath}
                      label={bath}
                      isSelected={filters.baths.includes(bath)}
                      onClick={() => toggleArrayFilter("baths", bath)}
                    />
                  ))}
                </div>
              </div>
              {/* Views Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Views
                </p>
                <div className="flex flex-wrap gap-3">
                  {VIEW_OPTIONS.map((view) => (
                    <FilterButton
                      key={view}
                      label={view}
                      isSelected={filters.views.includes(view)}
                      onClick={() => toggleArrayFilter("views", view)}
                    />
                  ))}
                </div>
              </div>
              {/* Outdoor Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Outdoor
                </p>
                <div className="flex flex-wrap gap-3">
                  {OUTDOOR_OPTIONS.map((out) => (
                    <FilterButton
                      key={out}
                      label={out}
                      isSelected={filters.outdoor.includes(out)}
                      onClick={() => toggleArrayFilter("outdoor", out)}
                    />
                  ))}
                </div>
              </div>
              {/* Property Style Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Property Style
                </p>
                <div className="flex flex-wrap gap-3">
                  {PROPERTY_STYLES.map((style) => (
                    <FilterButton
                      key={style}
                      label={style}
                      isSelected={filters.propertyStyle.includes(style)}
                      onClick={() => toggleArrayFilter("propertyStyle", style)}
                    />
                  ))}
                </div>
              </div>
              {/* Lease Term Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Lease Term
                </p>
                <div className="flex flex-wrap gap-3">
                  {LEASE_TERMS.map((term) => (
                    <FilterButton
                      key={term}
                      label={term}
                      isSelected={filters.leaseTerm.includes(term)}
                      onClick={() => toggleArrayFilter("leaseTerm", term)}
                    />
                  ))}
                </div>
              </div>
              {/* Floors Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Floors
                </p>
                <div className="flex flex-wrap gap-3">
                  {FLOOR_OPTIONS.map((floor) => (
                    <FilterButton
                      key={floor}
                      label={floor}
                      isSelected={filters.floors.includes(floor)}
                      onClick={() => toggleArrayFilter("floors", floor)}
                    />
                  ))}
                </div>
              </div>
              {/* Noise Level Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Noise Level
                </p>
                <div className="flex flex-wrap gap-3">
                  {NOISE_LEVELS.map((noise) => (
                    <FilterButton
                      key={noise}
                      label={noise}
                      isSelected={filters.noiseLevel.includes(noise)}
                      onClick={() => toggleArrayFilter("noiseLevel", noise)}
                    />
                  ))}
                </div>
              </div>
              {/* Laundry Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Laundry
                </p>
                <div className="flex flex-wrap gap-3">
                  {LAUNDRY_OPTIONS.map((laund) => (
                    <FilterButton
                      key={laund}
                      label={laund}
                      isSelected={filters.laundry.includes(laund)}
                      onClick={() => toggleArrayFilter("laundry", laund)}
                    />
                  ))}
                </div>
              </div>
              {/* Security Features Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Security Features
                </p>
                <div className="flex flex-wrap gap-3">
                  {SECURITY_FEATURES.map((sec) => (
                    <FilterButton
                      key={sec}
                      label={sec}
                      isSelected={filters.securityFeatures.includes(sec)}
                      onClick={() => toggleArrayFilter("securityFeatures", sec)}
                    />
                  ))}
                </div>
              </div>
              {/* Amenities Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Amenities
                </p>
                <div className="flex flex-wrap gap-3">
                  {AMENITIES.map((amen) => (
                    <FilterButton
                      key={amen}
                      label={amen}
                      isSelected={filters.amenities.includes(amen)}
                      onClick={() => toggleArrayFilter("amenities", amen)}
                    />
                  ))}
                </div>
              </div>
              {/* Internet Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Internet
                </p>
                <div className="flex flex-wrap gap-3">
                  {INTERNET_TYPES.map((net) => (
                    <FilterButton
                      key={net}
                      label={net}
                      isSelected={filters.internet.includes(net)}
                      onClick={() => toggleArrayFilter("internet", net)}
                    />
                  ))}
                </div>
              </div>
              {/* Heating Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Heating
                </p>
                <div className="flex flex-wrap gap-3">
                  {HEATING_TYPES.map((heat) => (
                    <FilterButton
                      key={heat}
                      label={heat}
                      isSelected={filters.heating.includes(heat)}
                      onClick={() => toggleArrayFilter("heating", heat)}
                    />
                  ))}
                </div>
              </div>
              {/* Cooling Filter */}
              <div>
                <p className="py-2 font-semibold text-primary text-base">
                  Cooling
                </p>
                <div className="flex flex-wrap gap-3">
                  {COOLING_TYPES.map((cool) => (
                    <FilterButton
                      key={cool}
                      label={cool}
                      isSelected={filters.cooling.includes(cool)}
                      onClick={() => toggleArrayFilter("cooling", cool)}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 flex w-full">
                <SheetClose
                  onClick={() => {
                    setFilters({
                      dealType: filters.dealType,
                      propertyType: [],
                      minPrice: 50,
                      maxPrice: 500,
                      radius: "",
                      beds: [],
                      baths: [],
                      views: [],
                      outdoor: [],
                      propertyStyle: [],
                      leaseTerm: [],
                      floors: [],
                      noiseLevel: [],
                      laundry: [],
                      securityFeatures: [],
                      amenities: [],
                      internet: [],
                      heating: [],
                      cooling: [],
                      location: location,
                    });
                    router.push(`/properties?dealType=${filters.dealType}`);
                  }}
                  className="text-black text-lg py-1 rounded-none bg-neutral-200 hover:bg-neutral-300 w-full"
                >
                  Clear
                </SheetClose>
                <SheetClose
                  onClick={handleSearch}
                  className="text-white text-lg rounded-none py-1 bg-secondary hover:bg-secondary2 w-full"
                >
                  Search
                </SheetClose>
              </div>
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
