import { IsString, MinLength } from 'class-validator';
import { PasswordDto } from './password.dto';

export abstract class UpdatePassword extends PasswordDto {
  @IsString()
  @MinLength(1)
  public newPassword: string;
}
