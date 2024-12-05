import React from "react";

interface Props {
  image: string;
  name: string;
  comment: string;
  rating: number;
}

const TestimonialCard = ({ image, name, comment, rating }: Props) => {
  return (
    <div className="bg-white rounded-2xl flex flex-col items-center p-6 sm:p-8 md:p-10 hover:scale-105 transition duration-300 shadow-lg max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <img
        src={image}
        alt={name}
        className="rounded-full object-cover h-24 w-24 mb-4 max-w-full"
      />
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">{name}</h1>
      <p className="text-center px-5 mb-4 text-sm sm:text-base">{comment}</p>
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((item) => (
          <svg
            key={item}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 fill-current ${
              item <= rating ? "text-primary" : "text-gray-300"
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fillRule="evenodd"
              d="M12 2l2.5 6.1L21 9l-5 4.3 1.7 6.1L12 16.4 7.3 19.4l1.7-6.1L3 9l5.5-0.9L12 2z"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;
