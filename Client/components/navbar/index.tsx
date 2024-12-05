"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { navLinks } from "@/constants";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(-1);
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed z-50 w-full shadow-lg transition-all duration-300 ${
        scroll ? "bg-[#f1f1f1]" : "bg-background"
      }`}
    >
      <div className="flex justify-between items-center py-2 md:py-4 container">
        {/* Logo */}
        <Link href="/">
          <img
            src={logo.src}
            alt="Logo"
            className="w-24 md:w-32 hover:scale-105 transition duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          <ul className="font-slab flex divide-x divide-secondary text-primary text-sm md:text-lg">
            {navLinks.map((link, index) => (
              <li
                key={link.title}
                className="px-2 md:px-4 relative"
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
          <Button variant="primary" className="px-6 md:px-8 text-sm md:text-lg">
            Login
          </Button>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <div onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="text-primary cursor-pointer" size={24} />
            ) : (
              <Menu className="text-primary cursor-pointer" size={24} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-14 left-0 w-full px-4 py-2 z-40">
          <ul className="font-slab flex flex-col space-y-3 text-primary text-sm">
            {navLinks.map((link, index) => (
              <li key={link.title}>
                <Link
                  href={link.url}
                  className="block py-2 px-3 hover:bg-secondary2/20 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 flex flex-col space-y-1">
                    {link.children.map((subLink, idx) => (
                      <Link
                        key={idx}
                        href={subLink.url}
                        className="text-gray-600 hover:bg-secondary2/20 transition px-4 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subLink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button variant="primary" className="w-full text-sm">
              Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
