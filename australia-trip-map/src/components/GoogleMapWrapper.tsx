import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Location, TripArea } from '../types/trip';

interface GoogleMapWrapperProps {
  tripData: TripArea[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  selectedDay: number | null;
}

const GoogleMapWrapper: React.FC<GoogleMapWrapperProps> = ({
  tripData,
  selectedLocation,
  onLocationSelect,
  selectedDay
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const loader = new Loader({
        apiKey: 'AIzaSyCO0kKndUNlmQi3B5mxy4dblg_8WYcuKuk',
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      await loader.load();

      const google = window.google;
      
      // Center map between Brisbane and Gold Coast
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: -27.8, lng: 153.2 },
        zoom: 9,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#0077be' }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });

      setMap(mapInstance);

      const infoWindowInstance = new google.maps.InfoWindow();
      setInfoWindow(infoWindowInstance);
    };

    initMap();
  }, []);

  // Create markers when map or data changes
  useEffect(() => {
    if (!map || !tripData) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    // Create markers for all locations
    tripData.forEach((area, areaIndex) => {
      area.locations.forEach((location, locationIndex) => {
        const marker = new google.maps.Marker({
          position: location.coordinates,
          map: map,
          title: location.name,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z" fill="${area.area === '布里斯本' ? '#FF6B35' : '#0077BE'}"/>
                <circle cx="16" cy="16" r="8" fill="white"/>
                <text x="16" y="21" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="${area.area === '布里斯本' ? '#FF6B35' : '#0077BE'}">${areaIndex * 10 + locationIndex + 1}</text>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(32, 40),
            anchor: new google.maps.Point(16, 40)
          }
        });

        marker.addListener('click', () => {
          onLocationSelect(location);
          
          if (infoWindow) {
            infoWindow.setContent(`
              <div class="p-4 max-w-sm">
                <h3 class="font-bold text-lg mb-2">${location.name}</h3>
                <p class="text-gray-600 mb-2">${location.address}</p>
                <div class="text-sm">
                  <strong>推薦餐廳:</strong>
                  ${location.recommendations.restaurants.slice(0, 2).map(r => `<br/>• ${r.name}`).join('')}
                </div>
              </div>
            `);
            infoWindow.open(map, marker);
          }
        });

        newMarkers.push(marker);
      });
    });

    setMarkers(newMarkers);
  }, [map, tripData, onLocationSelect, infoWindow]);

  // Center map on selected location
  useEffect(() => {
    if (map && selectedLocation) {
      map.panTo(selectedLocation.coordinates);
      map.setZoom(13);
    }
  }, [map, selectedLocation]);

  return (
    <div className="h-full w-full">
      <div ref={mapRef} className="h-full w-full rounded-lg shadow-lg" />
    </div>
  );
};

export default GoogleMapWrapper;