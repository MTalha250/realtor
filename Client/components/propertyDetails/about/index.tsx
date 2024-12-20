import React from "react";
interface Props {
  property: Property;
}

const About = (props: Props) => {
  return (
    <div className="py-10">
      <h1 className="text-4xl font-slab mb-8">About The Building</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Type */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">
            Property Type:
          </span>
          <span className="text-gray-600">{props.property.propertyType}</span>
        </div>

        {/* Property Style */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">
            Property Style:
          </span>
          <span className="text-gray-600">
            {props.property.propertyStyle.join(", ")}
          </span>
        </div>

        {/* Deal Type */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Deal Type:</span>
          <span className="text-gray-600">
            {props.property.dealType[0].toUpperCase() +
              props.property.dealType.slice(1)}
          </span>
        </div>

        {/* Area */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Area:</span>
          <span className="text-gray-600">{props.property.area} sqft</span>
        </div>

        {/* Bedrooms */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Bedrooms:</span>
          <span className="text-gray-600">{props.property.bedrooms}</span>
        </div>

        {/* Bathrooms */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Bathrooms:</span>
          <span className="text-gray-600">{props.property.bathrooms}</span>
        </div>

        {/* Floors */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Floors:</span>
          <span className="text-gray-600">{props.property.floors}</span>
        </div>

        {/* Condition */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Condition:</span>
          <span className="text-gray-600">
            {props.property.condition[0].toUpperCase() +
              props.property.condition.slice(1)}
          </span>
        </div>

        {/* Lease Term */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Lease Term:</span>
          <span className="text-gray-600">{props.property.leaseTerm}</span>
        </div>

        {/* Noise Level */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">
            Noise Level:
          </span>
          <span className="text-gray-600">{props.property.noiseLevel}</span>
        </div>

        {/* Laundry */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Laundry:</span>
          <span className="text-gray-600">{props.property.laundry}</span>
        </div>

        {/* Internet */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Internet:</span>
          <span className="text-gray-600">{props.property.internet}</span>
        </div>

        {/* Heating */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Heating:</span>
          <span className="text-gray-600">
            {props.property.heating.join(", ")}
          </span>
        </div>

        {/* Cooling */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Cooling:</span>
          <span className="text-gray-600">
            {props.property.cooling.join(", ")}
          </span>
        </div>

        {/* Security Features */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">
            Security Features:
          </span>
          <span className="text-gray-600">
            {props.property.securityFeatures.join(", ")}
          </span>
        </div>

        {/* Amenities */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Amenities:</span>
          <span className="text-gray-600">
            {props.property.amenities.join(", ")}
          </span>
        </div>

        {/* Outdoor */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">Outdoor:</span>
          <span className="text-gray-600">
            {props.property.outdoor.join(", ")}
          </span>
        </div>

        {/* View */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex items-center">
          <span className="font-semibold text-gray-700 w-1/3">View:</span>
          <span className="text-gray-600">
            {props.property.view.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
