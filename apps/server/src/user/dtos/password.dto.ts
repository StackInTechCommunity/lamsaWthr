import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export abstract class PasswordDto {
  @ApiProperty({ description: 'The current password of the user' })
  @IsString()
  @MinLength(1)
  public password: string;
}
