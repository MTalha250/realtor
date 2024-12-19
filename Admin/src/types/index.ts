type Admin = {
  id: number | null;
  username: string;
  email: string;
  phone: string;
  profile_image: string;
  created_at: string;
  updated_at: string;
};

type Blog = {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  titleImage: string;
  description: string;
  content: string;
  timeToRead: string;
  created_at: string;
  updated_at: string;
};

type Property = {
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
  dealType: string;
  view: string[];
  outdoor: string[];
  propertyStyle: string[];
  leaseTerm: string;
  floors: number;
  noiseLevel: string;
  laundry: string;
  securityFeatures: string[];
  amenities: string[];
  internet: string;
  heating: string[];
  cooling: string[];
  condition: string;
  video: string;
  price: number;
  priceType: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
};

export type { Blog, Admin, Property };
