import { IsString, Length } from 'class-validator';

export abstract class IdOrUsernameParam {
  @IsString()
  @Length(1, 106)
  public idOrUsername: string;
}
