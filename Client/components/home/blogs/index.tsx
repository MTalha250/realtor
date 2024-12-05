"use client";
import BlogGrid from "@/components/grids/blogGrid";
import Link from "next/link";
import React, { useState } from "react";
import img from "@/assets/product.jpg";

const Blogs = () => {
  const [blogs, setBlogs] = useState<Partial<Blog>[]>([
    {
      id: 1,
      titleImage: img.src,
      title: "ARB TO Sign Agreement For Village",
      description:
        "The ARB is set to sign an agreement with the village council to build a new school.",
    },
    {
      id: 2,
      titleImage: img.src,
      title: "ARB TO Sign Agreement For Village",
      description:
        "The ARB is set to sign an agreement with the village council to build a new school.",
    },
    {
      id: 3,
      titleImage: img.src,
      title: "ARB TO Sign Agreement For Village",
      description:
        "The ARB is set to sign an agreement with the village council to build a new school.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-4xl font-slab text-center sm:text-left">
          Latest Updates
        </h1>
        <Link
          href="/blogs"
          className="bg-secondary py-2 px-6 sm:px-10 text-sm sm:text-lg text-white rounded-md hover:bg-secondary2 transition duration-300 text-center"
        >
          View All
        </Link>
      </div>
      <BlogGrid blogs={blogs} loading={loading} />
    </div>
  );
};

export default Blogs;
