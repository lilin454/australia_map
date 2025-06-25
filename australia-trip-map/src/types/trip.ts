export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Restaurant {
  name: string;
  address: string;
}

export interface Attraction {
  name: string;
  address: string;
}

export interface Recommendations {
  restaurants: Restaurant[];
  attractions: Attraction[];
}

export interface Location {
  name: string;
  address: string;
  coordinates: Coordinates;
  place_id: string;
  recommendations: Recommendations;
}

export interface TripArea {
  area: string;
  locations: Location[];
}

export interface DayActivity {
  day: number;
  date: string;
  title: string;
  description: string;
  locations: string[];
  area: string;
}