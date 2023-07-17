export interface City {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
  weather: {
    temperatureC: number;
    temperatureF: number;
    windSpeed: number;
    isDay: number;
  };
}

