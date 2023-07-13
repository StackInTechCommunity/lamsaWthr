export interface IDb {
  host: string;
  user: string;
  name: string;
  password: string;
}
export interface IJwtToken {
  secret: string;
  time: number;
}
export interface IJwt {
  access: IJwtToken;
}

export interface IConfig {
  port: number;
  domain: string;
  db: IDb;
  jwt: IJwt;
}
