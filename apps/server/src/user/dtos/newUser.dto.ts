import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { NAME_REGEX } from '../../common/consts/regex.const';
import { PasswordDto } from './password.dto';

export abstract class NewUserDto extends PasswordDto {
  @ApiProperty()
  @IsString()
  public username: string;
}
