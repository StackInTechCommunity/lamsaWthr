import { IUser, IUserResponse } from '../user.interfaces';

export class ResponseUserMapper implements IUserResponse {
  public id: string;
  public username: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(values: IUserResponse) {
    Object.assign(this, values);
  }

  public static map(user: IUser): ResponseUserMapper {
    return new ResponseUserMapper({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  }
}
