import { IUser } from '../../user/user.interfaces';
import {
  ICity,
  IUserCities,
  IUserCitiesResponse,
  IUserSettings,
} from '../interfaces/weather.interfaces';

export class UserCitiesMapper implements IUserCitiesResponse {
  public id: string;
  public username: string;
  public createdAt: string;
  public updatedAt: string;
  cities: ICity[];
  settings: IUserSettings;
  constructor(values: IUserCitiesResponse) {
    Object.assign(this, values);
  }

  public static map(user: IUserCities): UserCitiesMapper {
    return new UserCitiesMapper({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      cities: user.cities,
      settings: user.settings,
    });
  }
}
