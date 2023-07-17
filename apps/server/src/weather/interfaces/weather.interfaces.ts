import { UserSettings } from '../../user/entities/userSettings.entity';
import { IUser, IUserResponse } from '../../user/user.interfaces';

export interface IWeather {
  temperatureC: number;
  temperatureF: number;
  windSpeed: number;
  isDay: boolean;
}

export interface ICity {
  id: string;
  name: string;
  longitude: string;
  latitude: string;
  weather?: IWeather | null;
}
export interface IUserCities extends IUser {
  cities: ICity[];
  settings: UserSettings;
}
export interface IUserSettings {
  preferredUnit: string;
}
export interface IUserCitiesResponse extends IUserResponse {
  cities: ICity[];
  settings: IUserSettings;
}
