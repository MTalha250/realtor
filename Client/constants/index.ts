export const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Sales",
    url: "/properties?category=sale",
    children: [
      {
        title: "Used Homes",
        url: "/properties?category=sale&dealType=used",
      },
      {
        title: "New Developments",
        url: "/properties?category=sale&dealType=new",
      },
    ],
  },
  {
    title: "Rentals",
    url: "/properties?category=rental",
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
