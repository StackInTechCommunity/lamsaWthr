import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { User } from '../user/entities/user.entity';
import { CommonService } from '../common/common.service';
import { UserService } from '../user/user.service';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, City]),
    CommonModule,
    UserModule,
    ConfigModule,
    HttpModule,
  ],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
