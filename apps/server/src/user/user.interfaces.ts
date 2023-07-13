export interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}
