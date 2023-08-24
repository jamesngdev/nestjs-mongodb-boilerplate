export type AppConfig = {
  nodeEnv: string;
  port: number;
};

export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  name: string;
  password: string;
  username: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  username?: string;
  password?: string;
};

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
};
