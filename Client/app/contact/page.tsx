import Hero from "@/components/common/hero";
import React from "react";
import img from "@/assets/hero.jpg";
import SocialIcons from "@/components/contact/socialIcons";
import ContactForm from "@/components/contact/contactForm";
import Team from "@/components/contact/team";

const Contact = () => {
  return (
    <div>
      <Hero img={img.src} title="Contact Us" />
      <SocialIcons />
      <ContactForm />
      <Team />
    </div>
  );
};

export default Contact;
