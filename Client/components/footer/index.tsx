import React from "react";
import Link from "next/link"; // Importing Next.js Link
import logo from "@/assets/logo.png";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Info,
  Phone,
  BookOpen,
  Home,
  Building,
  FileText,
  MapPin,
  DollarSign,
} from "lucide-react"; // Importing icons

const Footer = () => {
  return (
    <div className="bg-[#f1f1f1] py-10">
      <div className="container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8 px-6">
        {/* Logo and Address */}
        <div>
          <img src={logo.src} alt="Logo" className="w-44 mb-4" />
          <p className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" /> 123 Anywhere
          </p>
          <p className="text-gray-600 pl-7">St., Any City, ST</p>
          <p className="text-gray-600 pl-7">12345</p>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/how-it-works"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Info className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Phone className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/blog-news"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Blog & News
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/used-homes"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Home className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Used Homes
              </Link>
            </li>
            <li>
              <Link
                href="/new-developments"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Building className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                New Developments
              </Link>
            </li>
            <li>
              <Link
                href="/rentals"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <FileText className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Rentals
              </Link>
            </li>
            <li>
              <Link
                href="/sell-or-rent"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <DollarSign className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Sell or Rent
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-bold text-lg mb-4">Social Media</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="https://facebook.com"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Facebook className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://instagram.com"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Instagram className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Twitter className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="https://youtube.com"
                className="flex items-center text-gray-600 hover:text-gray-800 hover:underline transition-all"
              >
                <Youtube className="w-5 h-5 mr-2 hover:scale-110 transition-transform" />{" "}
                YouTube
              </Link>
            </li>
          </ul>
        </div>

        {/* Map Section */}
        <div className="col-span-2 flex flex-col items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26892657.307891723!2d-113.74375805576314!3d36.24345041242574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDE0JzM2LjAiTiA3MMKwMDAnMDAuMCJX!5e0!3m2!1sen!2sus!4v1637573808651!5m2!1sen!2sus"
            title="USA Map"
            className="w-full h-[30vh] border-0 rounded-lg"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-500">
        <p>@2024 Realtor. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
