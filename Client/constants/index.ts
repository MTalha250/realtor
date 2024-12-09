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
    url: "/properties?dealType=rental",
  },
  {
    title: "Sell or Rent",
    url: "/sell-rent",
  },

  {
    title: "Contact Us",
    url: "/contact",
    children: [
      {
        title: "About Us",
        url: "/about",
      },
      {
        title: "Blog",
        url: "/blog",
      },
    ],
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
];
