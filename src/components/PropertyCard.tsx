import React from "react";

export interface PropertyCardProps {
  title: string;
  imgs: string[];
  price: string;
  bedrooms: string;
  full_bathrooms: string;
  address: string;
  total_sqft?: string;
  status?: string;
  onClick?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  imgs,
  price,
  bedrooms,
  full_bathrooms,
  address,
  total_sqft,
  status,
  onClick,
}) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg shadow-sm p-4 max-w-sm bg-white flex flex-col gap-3 hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imgs && imgs.length > 0 ? imgs[0] : "/public/file.svg"}
        alt={title}
        className="w-full h-44 object-cover rounded-md bg-gray-100"
      />
      <h2 className="text-lg font-semibold text-gray-800 m-0">{title}</h2>
      <div className="flex gap-3 text-sm text-gray-600">
        <span>{bedrooms} Bed</span>
        <span>{full_bathrooms} Bath</span>
        {total_sqft && <span>{total_sqft} sqft</span>}
      </div>
      <div className="text-base font-medium text-green-700">{price}</div>
      <p className="text-sm text-gray-500 m-0">{address}</p>
      {status && <div className="text-xs text-blue-600 font-medium mt-1">{status}</div>}
    </div>
  );
};

export default PropertyCard; 