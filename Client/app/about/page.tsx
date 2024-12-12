"use client";
import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/common/hero";
import img from "@/assets/hero.jpg";
import { CheckCircle2, Target, Globe } from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero img={img.src} title="About Us" />
      <div className="container pb-20">
        {/* Company Overview */}
        <motion.section
          className="py-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-medium font-slab text-primary mb-6 leading-tight">
              Welcome to Your Dream Property
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We specialize in connecting buyers, sellers, landlords, and
              tenants with properties that match their unique needs. Our
              platform transforms property search into a seamless, personalized
              experience.
            </p>
          </motion.div>
        </motion.section>
        <section className="py-10">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className=" p-8 rounded-xl shadow-lg bg-[#F1F1F1]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-5">
                <Target className="text-primary w-12 h-12 mr-4" />
                <h3 className="text-2xl sm:text-3xl font-slab font-medium text-primary">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to revolutionize property transactions by
                providing cutting-edge tools, comprehensive support, and an
                intuitive platform that simplifies the journey for buyers,
                sellers, and renters alike.
              </p>
            </motion.div>

            <motion.div
              className=" p-8 rounded-xl shadow-lg bg-[#F1F1F1]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-5">
                <Globe className="text-primary w-12 h-12 mr-4" />
                <h3 className="text-2xl sm:text-3xl font-slab font-medium text-primary">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To become the global leader in property transactions by
                leveraging technology, fostering trust, and creating
                unprecedented accessibility in real estate connections.
              </p>
            </motion.div>
          </div>
        </section>
        <section className="py-10">
          <h3 className="text-3xl md:text-4xl font-slab font-medium text-primary text-center mb-10">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: "Extensive Listings",
                description:
                  "Comprehensive property options for sale and rent.",
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: "Smart Filters",
                description: "Advanced search to match your exact preferences.",
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: "Secure Transactions",
                description: "Verified listings with robust security measures.",
              },
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
                title: "Expert Support",
                description:
                  "Professional guidance at every step of your journey.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className=" p-6 rounded-xl text-center shadow-md bg-[#F1F1F1]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-primary mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="py-10 my-10 bg-primary text-white rounded-3xl">
          <motion.div
            className="max-w-3xl mx-auto text-center p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Dream Property?
            </h3>
            <p className="text-xl mb-8 text-gray-200">
              Your perfect property is just a click away. Start your journey
              with us today.
            </p>
            <button className="px-10 py-4 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Browse Properties
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
