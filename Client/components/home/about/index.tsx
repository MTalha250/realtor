import Link from "next/link";
import React from "react";
import img from "@/assets/hero.jpg";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const About = () => {
  return (
    <div className="container py-20">
      <div className="mb-10">
        <div className="flex justify-between mb-20">
          <h1 className="text-5xl text-primary font-slab font-medium max-w-sm">
            Complete Solution to Your Property Needs
          </h1>
          <div className="w-1/2">
            <p className="mb-8 text-lg">
              Discover an extensive range of premium properties designed to
              match your unique lifestyle and budget. Whether you're looking for
              a cozy starter home, a luxurious retreat, or the perfect family
              residence, we`re here to guide you every step of the way. Let us
              turn your vision into reality and help you find the home of your
              dreams!
            </p>
            <Link
              href="/about"
              className="bg-secondary py-4 px-8 text-lg hover:bg-secondary2 transition duration-300 rounded-md"
            >
              More portfolio
            </Link>
          </div>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="border-none gap-4"
        >
          <ResizablePanel defaultSize={50}>
            <img src={img.src} alt="" className="h-[50vh] rounded-2xl" />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical" className="gap-4">
              <ResizablePanel defaultSize={60}>
                <img
                  src={img.src}
                  alt=""
                  className="h-full w-full object-cover rounded-2xl"
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <img
                  src={img.src}
                  alt=""
                  className="h-full w-full object-cover rounded-2xl"
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div>
        <h1 className="text-center font-slab text-4xl mb-10">Why Choose Us</h1>
        <div className="flex justify-between gap-10">
          <div>
            <img
              src={img.src}
              alt=""
              className="rounded-2xl h-60 w-full object-cover mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">Trusted Experience</h1>
            <p className="w-[90%]">
              We have years of experience in the property industry and have
              helped thousand of clients find their dream home
            </p>
          </div>
          <div>
            <img
              src={img.src}
              alt=""
              className="rounded-2xl h-60 w-full object-cover mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">Best Quality</h1>
            <p className="w-[90%]">
              Every property in our portfolio goes through a rigorous selection
              to ensure quality and customer satisfaction
            </p>
          </div>
          <div>
            <img
              src={img.src}
              alt=""
              className="rounded-2xl h-60 w-full object-cover mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">Personal Service</h1>
            <p className="w-[90%]">
              Our team is ready to provide personal service and support you from
              start to finish of the process of buying or renting a property
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
