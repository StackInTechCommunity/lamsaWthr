import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Matches } from 'class-validator';
import { NAME_REGEX } from '../../common/consts/regex.const';
import { PasswordDto } from './password.dto';

export abstract class NewUserDto extends PasswordDto {
  @ApiProperty()
  @IsString()
  public id: string;
  @ApiProperty()
  @IsString()
  public username: string;
}
