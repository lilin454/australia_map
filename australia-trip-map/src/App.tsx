import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Plane } from 'lucide-react';
import GoogleMapWrapper from './components/GoogleMapWrapper';
import TripTimeline from './components/TripTimeline';
import LocationDetails from './components/LocationDetails';
import TravelTips from './components/TravelTips';
import { TripArea, Location, DayActivity } from './types/trip';

function App() {
  const [tripData, setTripData] = useState<TripArea[]>([]);
  const [schedule, setSchedule] = useState<DayActivity[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Load trip data and schedule
  useEffect(() => {
    const loadData = async () => {
      try {
        const [tripResponse, scheduleResponse] = await Promise.all([
          fetch('/data/australia_trip_data.json'),
          fetch('/data/trip-schedule.json')
        ]);

        const tripData = await tripResponse.json();
        const scheduleData = await scheduleResponse.json();

        setTripData(tripData);
        setSchedule(scheduleData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    
    // Find locations for this day
    const dayData = schedule.find(d => d.day === day);
    if (dayData && dayData.locations.length > 0) {
      // Find the first location that matches
      for (const area of tripData) {
        for (const location of area.locations) {
          if (dayData.locations.some(dayLocation => 
            location.name.includes(dayLocation) || dayLocation.includes(location.name)
          )) {
            setSelectedLocation(location);
            break;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入澳洲行程資料中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-lg relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/australia-map-bg.jpeg')" }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-orange-500 to-blue-500 text-white p-3 rounded-xl">
                <Plane size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">澳洲16天行程互動地圖</h1>
                <p className="text-gray-600 mt-1">數位城市之旅 • 探索影視靈感</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                2025/07/26 - 08/10
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                布里斯本 • 黃金海岸
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Timeline Sidebar */}
          <div className="lg:col-span-1">
            <TripTimeline
              schedule={schedule}
              selectedDay={selectedDay}
              onDaySelect={handleDaySelect}
            />
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3 space-y-4">
            <div className="h-4/5">
              <GoogleMapWrapper
                tripData={tripData}
                selectedLocation={selectedLocation}
                onLocationSelect={handleLocationSelect}
                selectedDay={selectedDay}
              />
            </div>
            
            {/* Travel Tips */}
            <div className="h-1/5">
              <TravelTips />
            </div>
          </div>
        </div>
      </div>

      {/* Location Details Modal */}
      <LocationDetails
        location={selectedLocation}
        onClose={() => setSelectedLocation(null)}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">青年百億海外圓夢基金計畫 • 海外翱翔組</p>
          <p className="text-sm text-gray-400">
            BJ-9-3 數位城市之旅探索影視靈感 • 澳大利亞昆士蘭州貿易暨投資辦事處
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;