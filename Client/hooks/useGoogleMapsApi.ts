import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMapsApi = (apiKey: string) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places", "geocoding"],
  });

  return { isLoaded, loadError };
};
