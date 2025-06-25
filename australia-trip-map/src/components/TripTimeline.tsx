import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { DayActivity } from '../types/trip';

interface TripTimelineProps {
  schedule: DayActivity[];
  selectedDay: number | null;
  onDaySelect: (day: number) => void;
}

const TripTimeline: React.FC<TripTimelineProps> = ({
  schedule,
  selectedDay,
  onDaySelect
}) => {
  const getAreaColor = (area: string) => {
    switch (area) {
      case '布里斯本':
        return 'bg-orange-500';
      case '黃金海岸':
        return 'bg-blue-500';
      case '交通':
        return 'bg-gray-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getAreaTextColor = (area: string) => {
    switch (area) {
      case '布里斯本':
        return 'text-orange-600';
      case '黃金海岸':
        return 'text-blue-600';
      case '交通':
        return 'text-gray-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white rounded-lg shadow-lg">
      <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-blue-500 text-white p-4 z-10">
        <h2 className="text-xl font-bold flex items-center">
          <Calendar className="mr-2" size={20} />
          澳洲16天行程時間軸
        </h2>
        <p className="text-sm opacity-90 mt-1">點擊日程查看詳細安排</p>
      </div>

      <div className="p-4 space-y-3">
        {schedule.map((day) => (
          <div
            key={day.day}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedDay === day.day
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onDaySelect(day.day)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${getAreaColor(day.area)} text-white text-sm font-bold flex items-center justify-center mr-3`}>
                  {day.day}
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Clock size={14} className="mr-1" />
                    {day.date}
                  </div>
                  <h3 className="font-semibold text-gray-800">{day.title}</h3>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${getAreaTextColor(day.area)} font-medium`}>
                {day.area}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2 leading-relaxed">
              {day.description}
            </p>
            
            {day.locations.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {day.locations.map((location, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    <MapPin size={10} className="mr-1" />
                    {location.length > 20 ? `${location.substring(0, 20)}...` : location}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripTimeline;