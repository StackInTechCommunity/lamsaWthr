import { IUser, IUserResponse } from '../../user/user.interfaces';

export interface IWeather {
  temperatureC: number;
  temperatureF: number;
  windSpeed: number;
  isDay: boolean;
}

export interface ICity {
  id: number;
  name: string;
  longitude: string;
  latitude: string;
  weather?: IWeather | null;
}
export interface IUserCities extends IUser {
  cities: ICity[];
}
export interface IUserCitiesResponse extends IUserResponse {
  cities: ICity[];
}
