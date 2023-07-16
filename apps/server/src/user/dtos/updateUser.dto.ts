import { IsString, Length, Matches, ValidateIf } from 'class-validator';
import { NAME_REGEX, SLUG_REGEX } from '../../common/consts/regex.const';
import { isNull, isUndefined } from '../../common/utils/validation.util';
import { ApiProperty } from '@nestjs/swagger';

export abstract class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 106)
  @Matches(SLUG_REGEX, {
    message: 'Username must be a valid slugs',
  })
  @ValidateIf((o: UpdateUserDto) => !isUndefined(o.username))
  public username?: string;
}
