import {
  IsNumber,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';
import { NAME_REGEX, SLUG_REGEX } from '../../common/consts/regex.const';
import { isNull, isUndefined } from '../../common/utils/validation.util';

export abstract class cityDto {
  @IsString()
  public name: string;

  @IsString()
  public longitude: string;

  @IsString()
  public latitude: string;
}
