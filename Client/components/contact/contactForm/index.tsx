import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

const ContactForm = () => {
  return (
    <div className="container py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-slab text-center text-secondary mb-4">
        Get In Touch
      </h1>
      <p className="text-center mb-4">
        Fill up the form our team will get back to you within 24 Hours
      </p>
      <form className="flex flex-col gap-2 md:gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full">
            <label className="block text-sm font-semibold" htmlFor="fullName">
              Full Name*
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Input your full name in here"
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="Input your Email in here"
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="number"
            >
              Number*
            </label>
            <input
              type="text"
              id="number"
              placeholder="0000"
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-semibold mb-2"
              htmlFor="country"
            >
              Country*
            </label>
            <input
              type="text"
              id="country"
              placeholder="Input Your Country Name"
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full">
            <label className="block text-sm font-semibold mb-2" htmlFor="city">
              City*
            </label>
            <input
              type="text"
              id="city"
              placeholder="Input Your City Name"
              className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-semibold mb-4"
              htmlFor="reason"
            >
              Why Contact
            </label>
            <Select>
              <SelectTrigger className="w-full h-[3.6rem] border-none border border-gray-300 bg-white/50 mt-2 focus:ring-0">
                <SelectValue placeholder="Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reason1">Reason 1</SelectItem>
                <SelectItem value="reason2">Reason 2</SelectItem>
                <SelectItem value="reason3">Reason 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Write your messages in here"
            className="w-full p-4 border border-gray-300 bg-white/50 mt-2"
            rows={5}
          ></textarea>
        </div>
        <div>
          <Button
            variant="primary"
            type="submit"
            className="text-white p-8 text-lg"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
