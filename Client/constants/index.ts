import img from "@/assets/p1.jpg";
import img2 from "@/assets/p2.jpg";
import img3 from "@/assets/p3.jpg";
export const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Sales",
    url: "/properties?dealType=sale",
    children: [
      {
        title: "Used Homes",
        url: "/properties?dealType=sale&condition=used",
      },
      {
        title: "New Developments",
        url: "/properties?dealType=sale&condition=new",
      },
    ],
  },
  {
    title: "Rentals",
    url: "/properties?dealType=rent",
  },
  {
    title: "Sell or Rent",
    url: "/sell-rent",
  },

  {
    title: "About Us",
    url: "/about",
  },
];

export const team = [
  {
    img: img.src,
    name: "John Doe",
    whatsapp: "https://wa.me/1234567890",
  },
  {
    img: img2.src,
    name: "Jane Doe",
    whatsapp: "https://wa.me/1234567890",
  },
  {
    img: img3.src,
    name: "John Doe",
    whatsapp: "https://wa.me/1234567890",
  },
  {
    img: img2.src,
    name: "Jane Doe",
    whatsapp: "https://wa.me/1234567890",
  },
  {
    img: img.src,
    name: "John Doe",
    whatsapp: "https://wa.me/1234567890",
  },
] as const;

export const PROPERTY_TYPES = [
  "Small House",
  "Beach House",
  "Condo",
  "Apartment",
  "Commercial",
] as const;

export const BEDROOM_OPTIONS = ["1", "2", "3", "4", "4+"] as const;

export const BATHROOM_OPTIONS = ["1", "2", "3", "4", "4+"] as const;

export const VIEW_OPTIONS = ["City", "Mountain", "Water", "Park"] as const;

export const OUTDOOR_OPTIONS = ["Balcony", "Garden", "Pool", "Patio"] as const;

export const PROPERTY_STYLES = [
  "Modern",
  "Classic",
  "Contemporary",
  "Colonial",
] as const;

export const LEASE_TERMS = [
  "1 year",
  "6 months",
  "3 months",
  "1 month",
] as const;

export const FLOOR_OPTIONS = ["1", "2", "3", "4", "4+"] as const;

export const NOISE_LEVELS = ["Low", "Medium", "High"] as const;

export const LAUNDRY_OPTIONS = ["In Unit", "On Site", "None"] as const;

export const SECURITY_FEATURES = [
  "Gated",
  "Security Guard",
  "Alarm System",
] as const;

export const AMENITIES = ["Pool", "Gym", "Parking", "Elevator"] as const;

export const INTERNET_TYPES = ["Fiber", "Cable", "DSL"] as const;

export const HEATING_TYPES = ["Electric", "Gas", "Oil"] as const;

export const COOLING_TYPES = ["Central", "Window", "Split"] as const;

export const RADIUS_OPTIONS = [
  { value: "5", label: "5 miles" },
  { value: "10", label: "10 miles" },
  { value: "20", label: "20 miles" },
  { value: "50", label: "50 miles" },
  { value: "100", label: "100 miles" },
] as const;

export const PRICE_RANGES = [
  { value: "50-100", label: "$50k - $100k", min: 50, max: 100 },
  { value: "100-200", label: "$100k - $200k", min: 100, max: 200 },
  { value: "200-500", label: "$200k - $500k", min: 200, max: 500 },
] as const;
