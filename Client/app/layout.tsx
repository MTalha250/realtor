"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { useEffect } from "react";
import { useGoogleMapsApi } from "@/hooks/useGoogleMapsApi";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import WhatsApp from "@/components/WhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setIsLoaded = useGoogleMapsStore((state) => state.setIsLoaded);
  const { isLoaded, loadError } = useGoogleMapsApi(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  );

  useEffect(() => {
    setIsLoaded(isLoaded);
  }, [isLoaded, setIsLoaded]);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <WhatsApp />
        </Suspense>
      </body>
    </html>
  );
}
