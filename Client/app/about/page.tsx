import React from "react";
import Hero from "@/components/common/hero";
import img from "@/assets/hero.jpg";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero img={img.src} title="About Us" />

      {/* Company Overview */}
      <section className="py-10 px-5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-primary mb-5">
            Welcome to Your Dream Property
          </h2>
          <p className="text-gray-600 text-lg">
            We specialize in connecting buyers, sellers, landlords, and tenants
            with properties that match their unique needs. Whether you’re
            looking for a cozy apartment, a luxurious mansion, or the perfect
            commercial space, our platform makes it easy to find the right fit.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-10 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Our mission is to simplify the property buying, selling, and
              renting process by offering cutting-edge tools and dedicated
              customer support. We aim to create a seamless experience for
              everyone, from first-time renters to seasoned property investors.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become the go-to platform for property transactions by
              fostering trust, innovation, and accessibility. We envision a
              future where finding and securing your dream property is as simple
              as a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Focus */}
      <section className="py-10 px-5">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-primary mb-5">
            Why Choose Us?
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            We prioritize your satisfaction by offering:
          </p>
          <ul className="list-disc text-gray-600 text-left max-w-md mx-auto">
            <li>Extensive property listings for sale and rent.</li>
            <li>Advanced filters to match your exact preferences.</li>
            <li>Secure transactions with verified listings.</li>
            <li>Professional customer support to assist at every step.</li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 px-5 bg-primary text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4">
            Ready to Find Your Dream Property?
          </h3>
          <p className="text-lg mb-6">
            Explore our listings and connect with the perfect property today.
          </p>
          <button className="px-8 py-3 bg-secondary2 text-primary font-semibold rounded-md">
            Browse Properties
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
