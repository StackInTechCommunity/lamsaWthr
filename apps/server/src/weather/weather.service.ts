import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CommonService } from '../common/common.service';
import { UserService } from '../user/user.service';
import { cityDto } from './dtos/Weather.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ICity, IUserCities, IWeather } from './interfaces/weather.interfaces';
import { isNull, isUndefined } from '../common/utils/validation.util';
@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    private readonly commonService: CommonService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {}
  public async getWeatherFromApi(city: cityDto): Promise<IWeather | null> {
    const { data } = await this.httpService.axiosRef({
      url: `${this.configService.get('api_url')}?latitude=${
        city.latitude
      }&longitude=${city.longitude}&current_weather=true&`,
      method: `GET`,
    });

    if (!isUndefined(data) && !isUndefined(data.current_weather)) {
      return {
        temperatureC: data.current_weather.temperature,
        temperatureF: (data.current_weather.temperature * 9) / 5 + 32,
        windSpeed: data.current_weather.windspeed,
        isDay: data.current_weather.is_day,
      };
    } else {
      return null;
    }
  }

  public async getUserWeather(idOrUsername: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.cities', 'city')
      .where('user.id = :idOrUsername or user.username=:idOrUsername', {
        idOrUsername,
      })
      .getOne();

    this.commonService.checkEntityExistence(user, 'user');
    const newUser: IUserCities = user!;
    await Promise.all(
      newUser.cities.map(async (city) => {
        city.weather = await this.getWeatherFromApi(city);
        return city;
      }),
    );
    return newUser!;
  }
  public async addWeather(idOrUsername: string, data: cityDto) {
    const user = await this.userService.findOneByIdOrUsername(idOrUsername);
    console.log(data);
    this.commonService.checkEntityExistence(user, 'user');
    console.log(data.longitude);
    const cityFromDb = await this.cityRepository.findOne({
      where: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });

    if (isUndefined(cityFromDb) || isNull(cityFromDb)) {
      console.log(cityFromDb);
      const city = this.cityRepository.create(data);
      await this.commonService.saveEntity(this.cityRepository, city);
      user.cities.push(city!);
    } else {
      const exists = user.cities.some(
        (userCity) =>
          userCity.name === cityFromDb!.name &&
          userCity.longitude === cityFromDb!.longitude &&
          userCity.latitude === cityFromDb!.latitude,
      );
      if (!exists) {
        user.cities.push(cityFromDb);
      }
    }

    await this.commonService.saveEntity(this.userRepository, user);
    return await this.getUserWeather(idOrUsername);
  }

  public async updateUserCity(
    idOrUsername: string,
    cityId: number,
    data: cityDto,
  ) {
    console.log(cityId);
    const oldCity = await this.cityRepository.findOne({
      where: { id: cityId },
    });
    this.commonService.checkEntityExistence(oldCity, 'city');
    const user = await this.userService.findOneByIdOrUsername(idOrUsername);
    this.commonService.checkEntityExistence(user, 'user');

    let newCity = await this.cityRepository.findOne({
      where: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
    if (isUndefined(newCity) || isNull(newCity)) {
      newCity = this.cityRepository.create(data);
      this.commonService.saveEntity(this.cityRepository, newCity);
    }
    user.cities = user.cities.map((city) => {
      if (
        city.latitude === oldCity!.latitude &&
        city.longitude === oldCity!.longitude
      ) {
        return Object.assign({}, city, newCity);
      }
      return city;
    });
    console.log(user.cities);
    await this.commonService.saveEntity(this.userRepository, user);
    return await this.getUserWeather(idOrUsername);
  }
  public async deleteUserCity(idOrUsername: string, cityId: number) {
    const city = await this.cityRepository.findOne({
      where: { id: cityId },
    });
    this.commonService.checkEntityExistence(city, 'city');
    const user = await this.userService.findOneByIdOrUsername(idOrUsername);
    this.commonService.checkEntityExistence(user, 'user');
    user.cities = user.cities.filter((city) => city.id !== cityId);
    await this.commonService.saveEntity(this.userRepository, user);
    return await this.getUserWeather(idOrUsername);
  }
}
