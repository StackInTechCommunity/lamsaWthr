export interface IUser {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
