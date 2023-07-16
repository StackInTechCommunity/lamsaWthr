import {
  IsNumber,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';
import { NAME_REGEX, SLUG_REGEX } from '../../common/consts/regex.const';
import { isNull, isUndefined } from '../../common/utils/validation.util';
import { ApiProperty } from '@nestjs/swagger';

export abstract class cityDto {
  @ApiProperty({ description: 'The name of the city' })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'The longitude of the city' })
  @IsString()
  public longitude: string;

  @ApiProperty({ description: 'The latitude of the city' })
  @IsString()
  public latitude: string;
}
