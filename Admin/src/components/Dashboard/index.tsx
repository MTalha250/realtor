"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { GiOpenBook } from "react-icons/gi";
import { FaHouseChimney } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import PropertiesChart from "../Charts/ChartOne";
const PropertiesDonutChart = dynamic(
  () => import("@/components/Charts/ChartThree"),
  {
    ssr: false,
  },
);

const Dashboard: React.FC = () => {
  const { token } = useAuthStore();

  useEffect(() => {}, []);

  // const fetchDashboardStats = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/dashboardStats`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     setProducts(res.data.productCount);
  //     setOrders(res.data.orders);
  //     setUsers(res.data.userCount);
  //     setBlogs(res.data.blogCount);
  //   } catch (error) {
  //     console.log("Error fetching dashboard stats: ", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDashboardStats();
  // }, []);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Site Viewers" total={"10"}>
          <FaEye className="fill-primary dark:fill-white" size={20} />
        </CardDataStats>
        <CardDataStats title="Total Properties" total={"10"}>
          <FaHouseChimney className="fill-primary dark:fill-white" size={20} />
        </CardDataStats>
        <CardDataStats title="Total Blogs" total="10">
          <GiOpenBook className="fill-primary dark:fill-white" size={20} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <PropertiesChart
          properties={[
            {
              id: 1,
              name: "Ocean View Apartment",
              created_at: "2023-01-15T10:30:00Z",
              location: "Miami, FL",
            },
            {
              id: 2,
              name: "Mountain Cabin",
              created_at: "2024-01-25T14:45:00Z",
              location: "Aspen, CO",
            },
            {
              id: 3,
              name: "City Center Condo",
              created_at: "2024-02-05T09:20:00Z",
              location: "New York, NY",
            },
            {
              id: 4,
              name: "Suburban House",
              created_at: "2024-03-10T11:00:00Z",
              location: "Palo Alto, CA",
            },
            {
              id: 5,
              name: "Beachside Villa",
              created_at: "2024-03-20T15:30:00Z",
              location: "Malibu, CA",
            },
            {
              id: 6,
              name: "Luxury Penthouse",
              created_at: "2024-04-10T08:15:00Z",
              location: "Los Angeles, CA",
            },
            {
              id: 7,
              name: "Countryside Cottage",
              created_at: "2024-05-22T16:40:00Z",
              location: "Nashville, TN",
            },
            {
              id: 8,
              name: "Modern Loft",
              created_at: "2024-06-18T12:00:00Z",
              location: "Austin, TX",
            },
            {
              id: 9,
              name: "Downtown Office Space",
              created_at: "2024-07-25T13:30:00Z",
              location: "Seattle, WA",
            },
            {
              id: 10,
              name: "Historic Mansion",
              created_at: "2024-08-15T17:45:00Z",
              location: "Charleston, SC",
            },
            {
              id: 11,
              name: "Studio Apartment",
              created_at: "2024-09-05T11:10:00Z",
              location: "San Francisco, CA",
            },
            {
              id: 12,
              name: "Farmhouse",
              created_at: "2024-10-30T14:20:00Z",
              location: "Des Moines, IA",
            },
          ]}
        />
        <PropertiesDonutChart
          newProperties={50}
          usedProperties={30}
          rentalProperties={10}
          saleProperties={10}
        />
      </div>
    </div>
  );
};

export default Dashboard;
