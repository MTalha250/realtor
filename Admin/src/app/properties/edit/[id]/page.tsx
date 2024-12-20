"use client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PROPERTY_TYPES,
  VIEW_OPTIONS,
  OUTDOOR_OPTIONS,
  PROPERTY_STYLES,
  LEASE_TERMS,
  NOISE_LEVELS,
  LAUNDRY_OPTIONS,
  SECURITY_FEATURES,
  AMENITIES,
  INTERNET_TYPES,
  HEATING_TYPES,
  COOLING_TYPES,
} from "@/constants";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import Modal from "react-modal";
import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { IoMdClose } from "react-icons/io";
import PhotosUploader from "@/components/Uploader";
import VideosUploader from "@/components/VideoUploader";
import axios from "axios";
import toast from "react-hot-toast";

// Zod schema for strong type validation
const PropertySchema = z.object({
  images: z.array(z.string()).min(1, "At least one image is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.object({
    longitude: z
      .number()
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude"),
    latitude: z
      .number()
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude"),
    region: z.string().min(1, "Location is required"),
  }),
  bedrooms: z
    .number()
    .min(0, "Bedrooms must be 0 or greater")
    .max(100, "Bedrooms must be less than 100"),
  bathrooms: z
    .number()
    .min(0, "Bathrooms must be 0 or greater")
    .max(100, "Bathrooms must be less than 100"),
  area: z
    .number()
    .min(1, "Area must be greater than 0")
    .max(10000, "Area must be less than 10000"),
  propertyType: z.string().min(1, "Property type is required"),
  dealType: z.enum(["sale", "rent"]),
  view: z.array(z.string()).min(1, "At least one view option is required"),
  outdoor: z
    .array(z.string())
    .min(1, "At least one outdoor option is required"),
  propertyStyle: z
    .array(z.string())
    .min(1, "At least one property style is required"),
  leaseTerm: z.string().min(1, "Lease term is required"),
  floors: z
    .number()
    .min(1, "Number of floors is required")
    .max(100, "Number of floors must be less than 100"),
  noiseLevel: z.string().min(1, "Noise level is required"),
  laundry: z.string().min(1, "Laundry option is required"),
  securityFeatures: z
    .array(z.string())
    .min(1, "At least one security feature is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  internet: z.string().min(1, "Internet type is required"),
  heating: z
    .array(z.string())
    .min(1, "At least one heating option is required"),
  cooling: z
    .array(z.string())
    .min(1, "At least one cooling option is required"),
  condition: z.enum(["new", "used"]),
  video: z.string().min(1, "Video is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  priceType: z.enum(["year", "month", "fixed", "negotiable"]),
});

type PropertyFormData = z.infer<typeof PropertySchema>;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "650px",
    maxHeight: "90vh",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    border: "1px solid #4b5563",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

// Memoized ToggleButtonGroup component
const ToggleButtonGroup = memo(
  ({
    label,
    error,
    options,
    selectedOptions,
    onChange,
  }: {
    label: string;
    error?: string;
    options: string[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
  }) => {
    const handleToggle = useCallback(
      (value: string) => {
        onChange(
          selectedOptions.includes(value)
            ? selectedOptions.filter((opt) => opt !== value)
            : [...selectedOptions, value],
        );
      },
      [selectedOptions, onChange],
    );

    return (
      <div className="mb-5.5">
        <p className="mb-3 block text-sm font-medium text-black dark:text-white">
          {label} {error && <span className="text-red">- {error}</span>}
        </p>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`rounded border border-stroke px-3 py-2 text-sm font-medium text-black dark:border-strokedark ${
                selectedOptions.includes(option)
                  ? "bg-primary text-white"
                  : "bg-gray dark:bg-meta-4 dark:text-white"
              }`}
              onClick={() => handleToggle(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  },
);
ToggleButtonGroup.displayName = "ToggleButtonGroup";

const EditProperty = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      images: [],
      title: "",
      description: "",
      location: {
        longitude: 0,
        latitude: 0,
        region: "",
      },
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      propertyType: "",
      dealType: "sale",
      view: [],
      outdoor: [],
      propertyStyle: [],
      leaseTerm: "",
      floors: 0,
      noiseLevel: "",
      laundry: "",
      securityFeatures: [],
      amenities: [],
      internet: "",
      heating: [],
      cooling: [],
      condition: "new",
      video: "",
      price: 0,
      priceType: "fixed",
    },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoaded = useGoogleMapsStore((state) => state.isLoaded);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
      );
      const property = response.data;
      const location = {
        latitude: Number(property.location.latitude),
        longitude: Number(property.location.longitude),
        region: property.location.region,
      };
      setValue("images", property.images);
      setValue("title", property.title);
      setValue("description", property.description);
      setValue("location", location);
      setValue("bedrooms", property.bedrooms);
      setValue("bathrooms", property.bathrooms);
      setValue("area", property.area);
      setValue("propertyType", property.propertyType);
      setValue("dealType", property.dealType);
      setValue("view", property.view);
      setValue("outdoor", property.outdoor);
      setValue("propertyStyle", property.propertyStyle);
      setValue("leaseTerm", property.leaseTerm);
      setValue("floors", property.floors);
      setValue("noiseLevel", property.noiseLevel);
      setValue("laundry", property.laundry);
      setValue("securityFeatures", property.securityFeatures);
      setValue("amenities", property.amenities);
      setValue("internet", property.internet);
      setValue("heating", property.heating);
      setValue("cooling", property.cooling);
      setValue("condition", property.condition);
      setValue("video", property.video);
      setValue("price", property.price);
      setValue("priceType", property.priceType);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  const handlePlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        setValue("location", {
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          region: place.formatted_address || "",
        });
      }
    }
  }, [setValue]);

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng?.lat();
      const lng = event.latLng?.lng();
      if (lat !== undefined && lng !== undefined) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
            setValue("location", {
              latitude: lat,
              longitude: lng,
              region: results[0].formatted_address || "",
            });
          }
        });
      }
    },
    [setValue],
  );

  const onSubmit = async (data: PropertyFormData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
        data,
      );
      toast.success(response.data.message || "Property edited successfully");
      router.push("/properties");
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb prev="Properties" pageName="Edit Property" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit Property
            </h3>
          </div>
          <div className="p-7">
            <form
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-5.5 w-full">
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <>
                      <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Images (Max 10)
                        {errors.images && (
                          <span className="text-red">
                            - {errors.images.message}
                          </span>
                        )}
                      </p>
                      <PhotosUploader
                        maxPhotos={10}
                        addedPhotos={field.value}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="title"
                        >
                          Title
                          {errors.title && (
                            <span className="text-red">
                              - {errors.title.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          id="title"
                          placeholder="Title"
                          {...field}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="dealType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="dealType"
                        >
                          Deal Type
                          {errors.dealType && (
                            <span className="text-red">
                              - {errors.dealType.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="dealType"
                          {...field}
                        >
                          <option value="">Select Deal Type</option>
                          <option value="sale">Sale</option>
                          <option value="rent">Rent</option>
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="mb-5.5 w-full">
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="location"
                      >
                        Location
                        {errors.location && (
                          <span className="text-red">
                            - {errors.location.message}
                          </span>
                        )}
                      </label>
                      <div className="flex items-center gap-2">
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={handlePlaceChanged}
                          className="w-full"
                        >
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            id="location"
                            placeholder="Location"
                            value={field.value.region}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                region: e.target.value,
                              })
                            }
                          />
                        </Autocomplete>
                        <button
                          onClick={() => setModalIsOpen(true)}
                          type="button"
                          className="flex justify-center whitespace-nowrap rounded bg-primary p-3.5 text-sm font-medium text-gray hover:bg-opacity-90"
                        >
                          Find on Map
                        </button>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={() => setModalIsOpen(false)}
                          style={customStyles}
                          contentLabel={"Find on Map"}
                        >
                          <div className="mb-5 flex items-center justify-between">
                            <h4 className="text-xl font-semibold text-white dark:text-white">
                              Find on Map
                            </h4>
                            <button
                              onClick={() => setModalIsOpen(false)}
                              className="dark:text-white dark:hover:text-white"
                            >
                              <IoMdClose size={18} />
                            </button>
                          </div>
                          {isLoaded && (
                            <GoogleMap
                              mapContainerStyle={{
                                width: "100%",
                                height: "400px",
                              }}
                              center={{
                                lat: field.value.latitude || 0,
                                lng: field.value.longitude || 0,
                              }}
                              zoom={15}
                              onClick={handleMapClick}
                              onLoad={(map) => {
                                mapRef.current = map;
                              }}
                            >
                              <Marker
                                position={{
                                  lat: field.value.latitude || 0,
                                  lng: field.value.longitude || 0,
                                }}
                              />
                            </GoogleMap>
                          )}
                          <div className="mt-5 flex justify-center">
                            <h4 className="text-lg font-semibold text-white dark:text-white">
                              Location:
                            </h4>
                            <p className="ml-2 text-lg text-white dark:text-white">
                              {field.value.region || "No location selected"}
                            </p>
                          </div>
                        </Modal>
                      </div>
                    </>
                  )}
                />
              </div>
              <div className="mb-5.5 w-full">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="description"
                      >
                        Description
                        {errors.description && (
                          <span className="text-red">
                            - {errors.description.message}
                          </span>
                        )}
                      </label>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        id="description"
                        placeholder="Description"
                        rows={5}
                        {...field}
                      />
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="price"
                        >
                          Price
                          {errors.price && (
                            <span className="text-red">
                              - {errors.price.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="price"
                          placeholder="Price"
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="priceType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="priceType"
                        >
                          Price Type
                          {errors.priceType && (
                            <span className="text-red">
                              - {errors.priceType.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="priceType"
                          {...field}
                        >
                          <option value="">Select Price Type</option>
                          <option value="fixed">Fixed</option>
                          <option value="negotiable">Negotiable</option>
                          <option value="year">Per Year</option>
                          <option value="month">Per Month</option>
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="bedrooms"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="bedrooms"
                        >
                          Bedrooms
                          {errors.bedrooms && (
                            <span className="text-red">
                              - {errors.bedrooms.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="bedrooms"
                          placeholder="Bedrooms"
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="bathrooms"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="bathrooms"
                        >
                          Bathrooms
                          {errors.bathrooms && (
                            <span className="text-red">
                              - {errors.bathrooms.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="bathrooms"
                          placeholder="Bathrooms"
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="area"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="area"
                        >
                          Area (sqft)
                          {errors.area && (
                            <span className="text-red">
                              - {errors.area.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="area"
                          placeholder="Area"
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="floors"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="floors"
                        >
                          Floors
                          {errors.floors && (
                            <span className="text-red">
                              - {errors.floors.message}
                            </span>
                          )}
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          id="floors"
                          placeholder="Floors"
                          value={field.value}
                          onChange={(e) => {
                            const value =
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="propertyType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="propertyType"
                        >
                          Property Type
                          {errors.propertyType && (
                            <span className="text-red">
                              - {errors.propertyType.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="propertyType"
                          {...field}
                        >
                          <option value="">Select Property Type</option>
                          {PROPERTY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="leaseTerm"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="leaseTerm"
                        >
                          Lease Term
                          {errors.leaseTerm && (
                            <span className="text-red">
                              - {errors.leaseTerm.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="leaseTerm"
                          {...field}
                        >
                          <option value="">Select Lease Term</option>
                          {LEASE_TERMS.map((term) => (
                            <option key={term} value={term}>
                              {term}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="noiseLevel"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="noiseLevel"
                        >
                          Noise Level
                          {errors.noiseLevel && (
                            <span className="text-red">
                              - {errors.noiseLevel.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="noiseLevel"
                          {...field}
                        >
                          <option value="">Select Noise Level</option>
                          {NOISE_LEVELS.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="laundry"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="laundry"
                        >
                          Laundry
                          {errors.laundry && (
                            <span className="text-red">
                              - {errors.laundry.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="laundry"
                          {...field}
                        >
                          <option value="">Select Laundry</option>
                          {LAUNDRY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="mb-5.5 w-full">
                  <Controller
                    name="internet"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="internet"
                        >
                          Internet
                          {errors.internet && (
                            <span className="text-red">
                              - {errors.internet.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="internet"
                          {...field}
                        >
                          <option value="">Select Internet</option>
                          {INTERNET_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  />
                </div>
                <div className="mb-5.5 w-full">
                  <Controller
                    name="condition"
                    control={control}
                    render={({ field }) => (
                      <>
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="condition"
                        >
                          Condition
                          {errors.condition && (
                            <span className="text-red">
                              - {errors.condition.message}
                            </span>
                          )}
                        </label>
                        <select
                          className="w-full appearance-none rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="condition"
                          {...field}
                        >
                          <option value="">Select Condition</option>
                          <option value="new">New</option>
                          <option value="used">Used</option>
                        </select>
                      </>
                    )}
                  />
                </div>
              </div>
              <ToggleButtonGroup
                label="Property Styles"
                error={errors.propertyStyle?.message}
                options={PROPERTY_STYLES}
                selectedOptions={watch("propertyStyle")}
                onChange={(selected) => setValue("propertyStyle", selected)}
              />
              <ToggleButtonGroup
                label="Amenities"
                error={errors.amenities?.message}
                options={AMENITIES}
                selectedOptions={watch("amenities")}
                onChange={(selected) => setValue("amenities", selected)}
              />
              <ToggleButtonGroup
                label="View"
                error={errors.view?.message}
                options={VIEW_OPTIONS}
                selectedOptions={watch("view")}
                onChange={(selected) => setValue("view", selected)}
              />
              <ToggleButtonGroup
                label="Outdoor"
                error={errors.outdoor?.message}
                options={OUTDOOR_OPTIONS}
                selectedOptions={watch("outdoor")}
                onChange={(selected) => setValue("outdoor", selected)}
              />
              <ToggleButtonGroup
                label="Security Features"
                error={errors.securityFeatures?.message}
                options={SECURITY_FEATURES}
                selectedOptions={watch("securityFeatures")}
                onChange={(selected) => setValue("securityFeatures", selected)}
              />
              <ToggleButtonGroup
                label="Heating"
                error={errors.heating?.message}
                options={HEATING_TYPES}
                selectedOptions={watch("heating")}
                onChange={(selected) => setValue("heating", selected)}
              />
              <ToggleButtonGroup
                label="Cooling"
                error={errors.cooling?.message}
                options={COOLING_TYPES}
                selectedOptions={watch("cooling")}
                onChange={(selected) => setValue("cooling", selected)}
              />
              <div className="mb-5.5 w-full">
                <p className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Upload Video
                  {errors.video && (
                    <span className="text-red">- {errors.video.message}</span>
                  )}
                </p>
                <VideosUploader
                  maxVideos={1}
                  addedVideos={watch("video") ? [watch("video")] : []}
                  onChange={(videos) => setValue("video", videos[0])}
                />
              </div>
              <button
                className="flex w-full justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Edit Property"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditProperty;
