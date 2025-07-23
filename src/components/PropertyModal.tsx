import React, { useState } from "react";

export interface PropertyModalProps {
  property: {
    title: string;
    imgs: Array<string>;
    videos: string;
    floor_plan: Array<string>;
    virtual_tutor: Array<string>;
    property_id: string;
    price: string;
    property_type: string;
    marketed_by: string;
    status: string;
    county: string;
    total_sqft: string;
    lot_size_unit: string;
    lot_size: string;
    full_bathrooms: string;
    bedrooms: string;
    right: string;
    address: string;
    access: Array<string>;
    structure: string;
    lot_category: string;
    area_designation: string;
    area_of_use: string;
    building_ratio_and_floor_area_ratio: string;
    fire_protection_designation: string;
    other_restrictions: string;
    living_area: string;
    year_built: string;
    current_status: string;
    delivery_date: string;
    mode_of_transaction: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageType, setCurrentImageType] = useState<'main' | 'floor' | 'virtual'>('main');

  if (!isOpen || !property) return null;

  const handleImageClick = (imageUrl: string, type: 'main' | 'floor' | 'virtual', index: number) => {
    console.log('Image clicked:', imageUrl);
    setSelectedImage(imageUrl);
    setCurrentImageType(type);
    setCurrentImageIndex(index);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const getCurrentImages = () => {
    switch (currentImageType) {
      case 'main':
        return property.imgs || [];
      case 'floor':
        return property.floor_plan || [];
      case 'virtual':
        return property.virtual_tutor || [];
      default:
        return property.imgs || [];
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const images = getCurrentImages();
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const images = getCurrentImages();
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">{property.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Main Image Gallery */}
            {property.imgs && property.imgs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Property Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {property.imgs.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200"
                        onClick={() => handleImageClick(img, 'main', index)}
                        onError={(e) => {
                          console.error('Image failed to load:', img);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', img);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Floor Plans */}
            {property.floor_plan && property.floor_plan.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Floor Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.floor_plan.map((plan, index) => (
                    <div key={index} className="relative">
                      <img
                        src={plan}
                        alt={`Floor Plan ${index + 1}`}
                        className="w-full h-64 object-contain rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200 bg-white"
                        onClick={() => handleImageClick(plan, 'floor', index)}
                        onError={(e) => {
                          console.error('Floor plan failed to load:', plan);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Floor plan loaded successfully:', plan);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Virtual Tours */}
            {property.virtual_tutor && property.virtual_tutor.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Virtual Tours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.virtual_tutor.map((tour, index) => (
                    <div key={index} className="relative">
                      <img
                        src={tour}
                        alt={`Virtual Tour ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-200"
                        onClick={() => handleImageClick(tour, 'virtual', index)}
                        onError={(e) => {
                          console.error('Virtual tour failed to load:', tour);
                          e.currentTarget.style.display = 'none';
                        }}
                        onLoad={() => {
                          console.log('Virtual tour loaded successfully:', tour);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Property Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Price:</span>
                    <span className="font-medium text-green-600">{property.price || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Bedrooms:</span>
                    <span className="font-medium text-gray-700">{property.bedrooms || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Bathrooms:</span>
                    <span className="font-medium text-gray-700">{property.full_bathrooms || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Total Sqft:</span>
                    <span className="font-medium text-gray-700">{property.total_sqft || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Year Built:</span>
                    <span className="font-medium text-gray-700">{property.year_built || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Property Type:</span>
                    <span className="font-medium text-gray-700">{property.property_type || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span className="font-medium text-gray-700">{property.status || "Not provided"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Location & Additional Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-start py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Address:</span>
                    <span className="font-medium text-gray-700 text-right max-w-xs">{property.address || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">County:</span>
                    <span className="font-medium text-gray-700">{property.county || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Lot Size:</span>
                    <span className="font-medium text-gray-700">
                      {property.lot_size && property.lot_size_unit 
                        ? `${property.lot_size} ${property.lot_size_unit}` 
                        : "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Living Area:</span>
                    <span className="font-medium text-gray-700">{property.living_area || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Structure:</span>
                    <span className="font-medium text-gray-700 ml-5">{property.structure || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Marketed By:</span>
                    <span className="font-medium text-gray-700">{property.marketed_by || "Not provided"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Simple Image Viewer */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] p-4"
          onClick={handleCloseImage}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseImage();
              }}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-3xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ×
            </button>

            {/* Previous Arrow */}
            {getCurrentImages().length > 1 && (
              <button
                onClick={handlePreviousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <img
              src={selectedImage}
              alt="Full size image"
              className="max-w-full max-h-full object-contain rounded-lg border border-white"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error('Full size image failed to load:', selectedImage);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Full size image loaded successfully:', selectedImage);
              }}
            />

            {/* Next Arrow */}
            {getCurrentImages().length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full w-14 h-14 flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image Counter */}
            {getCurrentImages().length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full px-6 py-3 text-lg font-medium">
                {currentImageIndex + 1} / {getCurrentImages().length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyModal; 