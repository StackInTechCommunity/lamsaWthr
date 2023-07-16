import { typeOrmConfigAsync } from '../../typeorm.config';
import { IConfig } from './config.interfaces';

export function config(): IConfig {
  return {
    port: parseInt(process.env.PORT!, 10),
    domain: process.env.DOMAIN!,
    api_url: process.env.API_URL!,
    jwt: {
      access: {
        secret: process.env.JWT_SECRET!,
        time: parseInt(process.env.JWT_ACCESS_TIME!, 10),
      },
    },
    db: typeOrmConfigAsync,
  };
}
