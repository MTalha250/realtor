"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { navLinks } from "@/constants";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(-1);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={
        "fixed z-50 w-full shadow-lg " +
        (scroll ? "bg-[#f1f1f1]" : "bg-background")
      }
    >
      <div className="flex justify-between items-center py-4 container">
        <Link href="/">
          <img
            src={logo.src}
            alt="Logo"
            className="w-32 hover:scale-105 transition duration-300"
          />
        </Link>
        <div className="hidden md:flex items-center gap-5">
          <ul className="font-slab flex divide-x divide-secondary text-primary text-lg">
            {navLinks.map((link, index) => (
              <li
                key={link.title}
                className="px-4 relative"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(-1)}
              >
                <Link
                  href={link.url}
                  className="border-b border-transparent hover:border-secondary hover:bg-secondary2/20 transition duration-300 py-1 px-2"
                >
                  {link.title}
                </Link>
                {link.children && activeDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 text-base"
                  >
                    <div className="mt-2 shadow-xl flex flex-col bg-white border border-gray-200 p-4 whitespace-nowrap w-full divide-y divide-secondary">
                      {link.children.map((subLink, index) => (
                        <Link
                          key={index}
                          href={subLink.url}
                          className="text-gray-600 hover:bg-secondary2/20 transition-colors duration-300 p-2"
                        >
                          {subLink.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="px-8 text-lg bg-secondary hover:bg-secondary2 rounded-md py-2 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
