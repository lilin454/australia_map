import React from 'react';
import { MapPin, Utensils, Camera, X } from 'lucide-react';
import { Location } from '../types/trip';

interface LocationDetailsProps {
  location: Location | null;
  onClose: () => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ location, onClose }) => {
  if (!location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-blue-500 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
              <p className="flex items-center text-sm opacity-90">
                <MapPin size={16} className="mr-2" />
                {location.address}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Restaurants Section */}
          {location.recommendations.restaurants.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Utensils className="mr-2 text-orange-500" size={20} />
                推薦餐廳
              </h3>
              <div className="grid gap-4">
                {location.recommendations.restaurants.map((restaurant, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200"
                  >
                    <h4 className="font-semibold text-gray-800 mb-1">{restaurant.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin size={14} className="mr-1 text-orange-500" />
                      {restaurant.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attractions Section */}
          {location.recommendations.attractions.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Camera className="mr-2 text-blue-500" size={20} />
                周邊景點
              </h3>
              <div className="grid gap-4">
                {location.recommendations.attractions.map((attraction, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200"
                  >
                    <h4 className="font-semibold text-gray-800 mb-1">{attraction.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin size={14} className="mr-1 text-blue-500" />
                      {attraction.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No recommendations message */}
          {location.recommendations.restaurants.length === 0 && 
           location.recommendations.attractions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Camera size={48} className="mx-auto mb-4 opacity-50" />
              <p>暫無推薦餐廳和景點資訊</p>
              <p className="text-sm mt-1">請查看其他景點的詳細信息</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;