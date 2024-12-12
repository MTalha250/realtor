"use client";
import React, { useState, useRef, useCallback, FormEvent } from "react";
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

interface Location {
  latitude: number;
  longitude: number;
  region: string;
}

interface PropertyDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  propertyType: string;
  images: string[];
  location: Location;
  propertyTitle: string;
  propertySize: string;
  bedrooms: number;
  bathrooms: number;
  listingType: "sale" | "rental";
}

const Calculator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof PropertyDetails, string>>
  >({});
  const [propertyDetails, setPropertyDetails] = useState<
    Partial<PropertyDetails>
  >({
    listingType: "sale",
    images: [],
    location: {
      latitude: 0,
      longitude: 0,
      region: "",
    },
  });

  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const validateStep = (currentStep: number): boolean => {
    const errors: Partial<Record<keyof PropertyDetails, string>> = {};

    switch (currentStep) {
      case 1:
        if (!propertyDetails.fullName?.trim())
          errors.fullName = "Full Name is required";

        if (!propertyDetails.email?.trim()) errors.email = "Email is required";
        else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(propertyDetails.email))
            errors.email = "Invalid email format";
        }

        if (!propertyDetails.phoneNumber?.trim())
          errors.phoneNumber = "Phone Number is required";
        else {
          const phoneRegex = /^[+]?[\d\s()-]{10,}$/;
          if (!phoneRegex.test(propertyDetails.phoneNumber))
            errors.phoneNumber = "Invalid phone number format";
        }

        if (!propertyDetails.country?.trim())
          errors.country = "Country is required";
        break;

      case 2:
        if (!propertyDetails.listingType)
          errors.listingType = "Listing type is required";

        if (!propertyDetails.images || propertyDetails.images.length === 0)
          errors.images = "At least one image is required";

        if (!propertyDetails.location?.region?.trim())
          errors.location = "Location is required";

        if (!propertyDetails.propertyTitle?.trim())
          errors.propertyTitle = "Property Title is required";

        if (!propertyDetails.propertySize?.trim())
          errors.propertySize = "Property Size is required";
        else {
          const sizeNum = parseFloat(propertyDetails.propertySize);
          if (isNaN(sizeNum) || sizeNum <= 0)
            errors.propertySize = "Invalid property size";
        }

        if (!propertyDetails.bedrooms || propertyDetails.bedrooms <= 0)
          errors.bedrooms = "Number of Bedrooms is required";

        if (!propertyDetails.bathrooms || propertyDetails.bathrooms <= 0)
          errors.bathrooms = "Number of Bathrooms is required";

        if (!propertyDetails.propertyType)
          errors.propertyType = "Property Type is required";
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (key: keyof PropertyDetails, value: any) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Clear specific error when input changes
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const handlePlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const location = {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          region: place.formatted_address || "",
        };
        handleInputChange("location", location);
      }
    }
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat !== undefined && lng !== undefined) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
          const location = {
            latitude: lat,
            longitude: lng,
            region: results[0].formatted_address || "",
          };
          handleInputChange("location", location);
        }
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep(2)) {
      // Perform final submission logic here
      console.log("Submitting property details:", propertyDetails);

      // TODO: Add actual submission logic (API call, etc.)
      setStep(3);
    }
  };

  const renderErrorMessage = (field: keyof PropertyDetails) => {
    return formErrors[field] ? (
      <span className="text-red-500 text-sm mt-1">{formErrors[field]}</span>
    ) : null;
  };

  return (
    <div className="container py-10 md:py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-primary2 p-10 rounded-3xl text-white"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-slab text-center mb-4">
          {step === 3
            ? "Thank you for your submission"
            : "How much is your property worth?"}
        </h1>
        <p className="text-secondary2 text-center max-w-2xl mx-auto mb-10">
          {step === 3
            ? "Thank you for your submission. We will contact you soon for an inspection."
            : "Please provide the following details and we will contact you soon for an inspection."}
        </p>

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row gap-5">
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
                  value={propertyDetails.fullName || ""}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Input your full name"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("fullName")}
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold" htmlFor="email">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  value={propertyDetails.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Input your Email"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("email")}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="phoneNumber"
                >
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={propertyDetails.phoneNumber || ""}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  placeholder="Enter phone number"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("phoneNumber")}
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="country"
                >
                  Country*
                </label>
                <input
                  type="text"
                  id="country"
                  value={propertyDetails.country || ""}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="Input Your Country Name"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("country")}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5">
            <RadioGroup
              defaultValue="sale"
              value={propertyDetails.listingType}
              onValueChange={(value: "sale" | "rental") =>
                handleInputChange("listingType", value)
              }
              className="flex gap-10 mx-auto"
            >
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
            {renderErrorMessage("listingType")}

            <div>
              <p className="text-sm font-semibold mb-2">Images*</p>
              <PhotosUploader
                maxPhotos={10}
                addedPhotos={propertyDetails.images || []}
                onChange={(photos) => handleInputChange("images", photos)}
              />
              {renderErrorMessage("images")}
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
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
                      value={propertyDetails.location?.region || ""}
                      onChange={(e) =>
                        handleInputChange("location", {
                          ...propertyDetails.location,
                          region: e.target.value,
                        })
                      }
                      placeholder="Input your location"
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
                            lat: propertyDetails.location?.latitude || 0,
                            lng: propertyDetails.location?.longitude || 0,
                          }}
                          zoom={15}
                          onClick={handleMapClick}
                          onLoad={(map) => {
                            mapRef.current = map;
                          }}
                        >
                          <Marker
                            position={{
                              lat: propertyDetails.location?.latitude || 0,
                              lng: propertyDetails.location?.longitude || 0,
                            }}
                          />
                        </GoogleMap>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                {renderErrorMessage("location")}
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-semibold"
                  htmlFor="propertyTitle"
                >
                  Property Title*
                </label>
                <input
                  type="text"
                  id="propertyTitle"
                  value={propertyDetails.propertyTitle || ""}
                  onChange={(e) =>
                    handleInputChange("propertyTitle", e.target.value)
                  }
                  placeholder="Input your property title"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("propertyTitle")}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
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
                  value={propertyDetails.propertySize || ""}
                  onChange={(e) =>
                    handleInputChange("propertySize", e.target.value)
                  }
                  placeholder="Input your property size"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("propertySize")}
              </div>
              <div className="w-full">
                <p className="block text-sm font-semibold mb-2">
                  Property Type*
                </p>
                <Select
                  value={propertyDetails.propertyType}
                  onValueChange={(value) =>
                    handleInputChange("propertyType", value)
                  }
                >
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
                {renderErrorMessage("propertyType")}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
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
                  value={propertyDetails.bedrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bedrooms", parseInt(e.target.value))
                  }
                  placeholder="Input number of bedrooms"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("bedrooms")}
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
                  value={propertyDetails.bathrooms || ""}
                  onChange={(e) =>
                    handleInputChange("bathrooms", parseInt(e.target.value))
                  }
                  placeholder="Input number of bathrooms"
                  className="w-full p-4 border-none bg-white mt-2 text-black"
                />
                {renderErrorMessage("bathrooms")}
              </div>
            </div>
          </div>
        )}

        {step === 3 ? (
          <div className="flex flex-col gap-5 text-center">
            <p className="text-2xl font-bold">Submission Successful</p>
            <p className="text-secondary2">
              Your property details have been received. Our team will review and
              contact you soon for further inspection.
            </p>
          </div>
        ) : (
          <div className="flex justify-between mt-10">
            {step !== 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-32 sm:w-40 h-14 relative group border-white border hover:border-neutral-400 transition duration-300"
              >
                <span className="absolute w-full h-full top-0 left-0 bg-neutral-400 scale-x-0 group-hover:scale-x-100 origin-left transition duration-300"></span>
                <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  Previous
                </span>
              </button>
            )}
            {step === 1 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="ml-auto relative group w-32 sm:w-40 h-14 border-secondary border hover:border-white transition duration-300"
              >
                <span className="absolute w-full h-full top-0 left-0 bg-secondary scale-x-100 group-hover:scale-x-0 origin-right transition duration-300"></span>
                <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  Next
                </span>
              </button>
            )}
            {step === 2 && (
              <button
                type="submit"
                className="ml-auto relative group w-32 sm:w-40 h-14 border-secondary border hover:border-white transition duration-300"
              >
                <span className="absolute w-full h-full top-0 left-0 bg-secondary scale-x-100 group-hover:scale-x-0 origin-right transition duration-300"></span>
                <span className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  Submit
                </span>
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Calculator;
