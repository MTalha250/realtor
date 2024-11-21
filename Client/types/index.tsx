type Product = {
  id: number;
  images: string[];
  title: string;
  description: string;
  location: {
    longitude: number;
    latitude: number;
    region: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  category: string;
  dealType: string;
  price: number;
  priceType: string;
  createdAt: string;
  updatedAt: string;
};

type Blog = {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  titleImage: string;
  description: string;
  category: string;
  content: string;
  timeToRead: string;
  createdAt: string;
  updatedAt: string;
};
