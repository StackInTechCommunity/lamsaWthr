import { IsString, MinLength } from 'class-validator';
import { PasswordDto } from './password.dto';
import { ApiProperty } from '@nestjs/swagger';

export abstract class UpdatePassword extends PasswordDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ description: 'The new password' })
  public newPassword: string;
}
