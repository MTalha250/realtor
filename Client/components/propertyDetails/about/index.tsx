import React from "react";
interface Props {
  property: Property;
}

const About = (props: Props) => {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-slab mb-5">About The Building</h1>
    </div>
  );
};

export default About;
