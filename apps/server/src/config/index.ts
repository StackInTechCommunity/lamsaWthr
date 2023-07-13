import { IConfig } from './config.interfaces';

export function config(): IConfig {
  return {
    port: parseInt(process.env.PORT!, 10),
    domain: process.env.DOMAIN!,
    jwt: {
      access: {
        secret: process.env.JWT_SECRET!,
        time: parseInt(process.env.JWT_ACCESS_TIME!, 10),
      },
    },
    db: {
      host: process.env.DB_HOST!,
      name: process.env.DB_NAME!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASS!,
    },
  };
}
