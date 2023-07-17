import { City } from "./City";
import { UserSettings } from "./UserSettings";

export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  cities: City[];
  settings: UserSettings;
}
