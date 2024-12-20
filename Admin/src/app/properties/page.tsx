"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Property } from "@/types";
import axios from "axios";
import Loader from "@/components/common/Loader";
import Delete from "@/components/Delete";
import { FaEdit } from "react-icons/fa";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/properties`,
      );
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.region.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DefaultLayout>
      <div className="relative mx-auto min-h-screen max-w-270">
        <Breadcrumb pageName="Properties" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col items-start justify-between px-4 py-6 sm:flex-row sm:items-center md:px-6 xl:px-7.5">
            <h4 className="mb-4 text-xl font-semibold text-black dark:text-white sm:mb-0">
              All Properties
            </h4>
            <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded border border-stroke bg-gray px-4 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary sm:w-auto"
              />
              <Link
                href="/properties/add"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
              >
                Add Property
              </Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="grid grid-cols-10 gap-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">Cover</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">Title</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="font-medium text-black dark:text-white">
                  Location
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">Beds</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">Baths</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">Type</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium text-black dark:text-white">Price</p>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <p className="font-medium text-black dark:text-white">
                  Actions
                </p>
              </div>
            </div>
            {loading ? (
              <Loader className="h-[60vh]" />
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="grid grid-cols-10 items-center gap-5 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                >
                  <div className="col-span-1 flex items-center">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {property.title}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-black dark:text-white">
                      {property.location.region}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {property.bedrooms}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {property.bathrooms}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      {property.dealType[0].toUpperCase() +
                        property.dealType.slice(1)}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-black dark:text-white">
                      ${property.price} / {property.priceType}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <Link
                      href={`/properties/edit/${property.id}`}
                      className="dark:text-white"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <Delete
                      api={`/properties/${property.id}`}
                      message="Property deleted successfully"
                      fetch={fetchProperties}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                No properties found
              </div>
            )}
          </div>
          <div className="block px-4 sm:hidden">
            {loading ? (
              <Loader className="h-[60vh]" />
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="mb-4 rounded-lg border border-stroke p-4 shadow-sm dark:border-strokedark dark:bg-boxdark"
                >
                  <div className="mb-4 flex flex-col">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="mt-4">
                      <p className="mb-2 font-semibold text-black dark:text-white">
                        {property.title}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Location: {property.location.region}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Beds: {property.bedrooms}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Baths: {property.bathrooms}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Type:{" "}
                        {property.dealType[0].toUpperCase() +
                          property.dealType.slice(1)}
                      </p>
                      <p className="text-sm text-black dark:text-white">
                        Price: ${property.price} / {property.priceType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/properties/edit/${property.id}`}
                        className="dark:text-white"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <Delete
                        api={`/properties/${property.id}`}
                        message="Property deleted successfully"
                        fetch={fetchProperties}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-black dark:text-white">
                No properties found.
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Properties;
