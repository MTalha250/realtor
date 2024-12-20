"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { useEffect } from "react";
import { useGoogleMapsApi } from "@/hooks/useGoogleMapsApi";
import { useGoogleMapsStore } from "@/store/GoogleMapsStore";
import WhatsApp from "@/components/WhatsApp";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

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
          <WhatsApp />
          <Toaster />
        </Suspense>
        <Script
          strategy="lazyOnload"
          src="https://embed.tawk.to/675ddb42af5bfec1dbdbd616/1if3a0v76"
        />
      </body>
    </html>
  );
}
