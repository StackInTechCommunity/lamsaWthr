import { Transform } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

export abstract class cityIdParam {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  public cityId: number;
}
