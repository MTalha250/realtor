"use client";
import React, { useCallback, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhotosUploader from "../Uploader";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_TYPES } from "@/constants";

const Calculator = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    region: "",
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null); // Reference for Google Map

  // Update the location state based on place selected from Autocomplete
  const handlePlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (!place.geometry) {
        console.error("Place has no geometry information");
        return;
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
        // Optionally move the map center to the new location
        if (mapRef.current) {
          mapRef.current.panTo(new google.maps.LatLng(lat, lng));
        }
      }
    }
  }, []);

  // Update location when map is clicked
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat !== undefined && lng !== undefined) {
      const newLocation = {
        latitude: lat,
        longitude: lng,
        region: "",
      };
      setLocation(newLocation);

      // Optionally update the Autocomplete input (you can use geocoding here if needed)
      if (autocompleteRef.current) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
            const region = results[0].formatted_address;
            setLocation((prev) => ({ ...prev, region }));
          }
        });
      }
    }
  };

  // Handle input changes (manual entry)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRegion = event.target.value;
    setLocation((prev) => ({
      ...prev,
      region: newRegion,
    }));
  };

  // Handle the submit of the manually typed input to update the map
  const handleInputSubmit = () => {
    if (location.region) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location.region }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
          const newLocation = {
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng(),
            region: results[0].formatted_address,
          };
          setLocation(newLocation);
          if (mapRef.current) {
            mapRef.current.panTo(
              new google.maps.LatLng(
                newLocation.latitude,
                newLocation.longitude
              )
            );
          }
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
        }
      });
    }
  };

  return (
    <div className="container py-20">
      <div className="bg-primary2 p-10 rounded-3xl text-white">
        <h1 className="text-4xl font-slab text-center mb-4">
          {step == 3
            ? "Thank you for your submission"
            : "How much is your property worth?"}
        </h1>
        <p className="text-secondary2 text-center max-w-2xl mx-auto mb-10">
          {step == 3
            ? "Thank you for your submission. We will contact you soon for an inspection."
            : "Please provide the following details and we will contact you soon for an inspection."}
        </p>
        {step == 1 && (
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="fullName"
                >
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Input your full name in here"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold" htmlFor="email">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Input your Email in here"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="number"
                >
                  Number*
                </label>
                <input
                  type="text"
                  id="number"
                  placeholder="0000"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="country"
                >
                  Country*
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="Input Your Country Name"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
            </div>
          </div>
        )}
        {step == 2 && (
          <div className="flex flex-col gap-5">
            <RadioGroup defaultValue="sale" className="flex gap-10 mx-auto">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sale" id="sale" />
                <Label htmlFor="sale" className="text-lg">
                  Sale
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rental" id="rental" />
                <Label htmlFor="rental" className="text-lg">
                  Rental
                </Label>
              </div>
            </RadioGroup>
            <div>
              <p className="text-sm font-semibold mb-2">Images*</p>
              <PhotosUploader
                maxPhotos={10}
                addedPhotos={images}
                onChange={(photos) => setImages(photos)}
              />
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <p className="text-sm font-semibold mb-2">Location*</p>
                <div className="flex mt-2">
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={handlePlaceChanged}
                    className="w-full"
                  >
                    <input
                      type="text"
                      id="location"
                      value={location.region}
                      onChange={handleInputChange}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleInputSubmit()
                      }
                      placeholder="Input your location in here"
                      className="w-full p-4 border-none bg-white text-black"
                    />
                  </Autocomplete>
                  <Dialog>
                    <DialogTrigger className="bg-secondary whitespace-nowrap px-8">
                      Find on map
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Find on map</DialogTitle>
                      {isLoaded && (
                        <GoogleMap
                          mapContainerStyle={{ width: "100%", height: "400px" }}
                          center={{
                            lat: location.latitude || 0,
                            lng: location.longitude || 0,
                          }}
                          zoom={15}
                          onClick={handleMapClick}
                          onLoad={(map) => {
                            mapRef.current = map; // Save map reference
                          }}
                        >
                          <Marker
                            position={{
                              lat: location.latitude,
                              lng: location.longitude,
                            }}
                          />
                        </GoogleMap>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold" htmlFor="title">
                  Property Title*
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Input your property title in here"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="propertySize"
                >
                  Property Size (sqft)*
                </label>
                <input
                  type="text"
                  id="propertySize"
                  placeholder="Input your property size in here"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
              <div className="w-full">
                <p className="block text-sm font-semibold mb-2">
                  Property Type*
                </p>
                <Select>
                  <SelectTrigger className="w-full h-14 border-none text-black">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="bedrooms"
                >
                  Bedrooms*
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  placeholder="Input number of bedrooms"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="bathrooms"
                >
                  Bathrooms*
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  placeholder="Input number of bathrooms"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
              </div>
            </div>
          </div>
        )}
        {step == 3 ? (
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold mb-2 text-center">
              Your property has been submitted
            </p>
          </div>
        ) : (
          <div className="flex justify-between mt-10">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="w-40 h-14 relative group border-white border hover:border-neutral-400 transition duration-300"
            >
              <span className="absolute w-full h-full top-0 left-0 bg-neutral-400 scale-x-0 group-hover:scale-x-100 origin-left transition duration-300"></span>
              <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                Previous
              </span>
            </button>
            <button
              onClick={() => setStep(step + 1)}
              className="ml-auto relative group w-40 h-14 border-secondary border hover:border-white transition duration-300"
            >
              <span className="absolute w-full h-full top-0 left-0 bg-secondary scale-x-100 group-hover:scale-x-0 origin-right transition duration-300"></span>
              <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                {step === 2 ? "Submit" : "Next"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
