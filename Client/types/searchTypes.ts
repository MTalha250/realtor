import {
  PROPERTY_TYPES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  VIEW_OPTIONS,
  OUTDOOR_OPTIONS,
  PROPERTY_STYLES,
  LEASE_TERMS,
  FLOOR_OPTIONS,
  NOISE_LEVELS,
  LAUNDRY_OPTIONS,
  SECURITY_FEATURES,
  AMENITIES,
  INTERNET_TYPES,
  HEATING_TYPES,
  COOLING_TYPES,
} from "@/constants";

export interface Location {
  longitude: number;
  latitude: number;
  region: string;
}

export interface SearchFilters {
  dealType?: string;
  location?: Location;
  radius?: string;
  propertyType: Array<(typeof PROPERTY_TYPES)[number]>;
  minPrice: number;
  maxPrice: number;
  beds: Array<(typeof BEDROOM_OPTIONS)[number]>;
  baths: Array<(typeof BATHROOM_OPTIONS)[number]>;
  views: Array<(typeof VIEW_OPTIONS)[number]>;
  outdoor: Array<(typeof OUTDOOR_OPTIONS)[number]>;
  propertyStyle: Array<(typeof PROPERTY_STYLES)[number]>;
  leaseTerm: Array<(typeof LEASE_TERMS)[number]>;
  floors: Array<(typeof FLOOR_OPTIONS)[number]>;
  noiseLevel: Array<(typeof NOISE_LEVELS)[number]>;
  laundry: Array<(typeof LAUNDRY_OPTIONS)[number]>;
  securityFeatures: Array<(typeof SECURITY_FEATURES)[number]>;
  amenities: Array<(typeof AMENITIES)[number]>;
  internet: Array<(typeof INTERNET_TYPES)[number]>;
  heating: Array<(typeof HEATING_TYPES)[number]>;
  cooling: Array<(typeof COOLING_TYPES)[number]>;
}

export interface SearchCardProps {
  dealType?: string;
  onSearchComplete?: (filters: SearchFilters) => void;
}
