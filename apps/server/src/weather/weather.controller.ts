import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ConfigService } from '@nestjs/config';
import { IdOrUsernameParam } from '../user/dtos/getUser.dto';
import { UserCitiesMapper } from './mappers/userCities.mapper';
import { cityDto } from './dtos/Weather.dto';
import { cityIdParam } from './dtos/qyary.params';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('weather')
@Controller('api/weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly configService: ConfigService,
  ) {}
  @Get('/:idOrUsername')
  public async getUserCities(@Param() param: IdOrUsernameParam) {
    const userCities = await this.weatherService.getUserWeather(
      param.idOrUsername,
    );
    console.log(userCities);
    return UserCitiesMapper.map(userCities);
  }

  @Post('/:idOrUsername')
  public async addWeather(
    @Param() param: IdOrUsernameParam,
    @Body() body: cityDto,
  ) {
    const userCities = await this.weatherService.addWeather(
      param.idOrUsername,
      body,
    );
    return UserCitiesMapper.map(userCities);
  }

  @Patch('/:idOrUsername')
  public async updateUserCity(
    @Param() param: IdOrUsernameParam,
    @Query() query: cityIdParam,
    @Body() body: cityDto,
  ) {
    const userCities = await this.weatherService.updateUserCity(
      param.idOrUsername,
      query.cityId,
      body,
    );
    return UserCitiesMapper.map(userCities);
  }

  @Delete('/:idOrUsername')
  public async deleteUserCity(
    @Param() param: IdOrUsernameParam,
    @Query() query: cityIdParam,
  ) {
    const userCities = await this.weatherService.deleteUserCity(
      param.idOrUsername,
      query.cityId,
    );
    return UserCitiesMapper.map(userCities);
  }
}
