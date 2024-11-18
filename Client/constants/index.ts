export const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Sales",
    url: "/properties?category=sales",
    children: [
      {
        title: "Used Homes",
        url: "/properties?category=sales&dealType=used",
      },
      {
        title: "New Developments",
        url: "/properties?category=sales&dealType=new",
      },
    ],
  },
  {
    title: "Rentals",
    url: "/properties?category=rentals",
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
