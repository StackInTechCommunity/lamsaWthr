import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsUUID, Length } from 'class-validator';

export abstract class cityIdParam {
  @IsUUID()
  @ApiProperty()
  public cityId: string;
}
