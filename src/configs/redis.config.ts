import { registerAs } from '@nestjs/config';
import { RedisConfig } from './config.type';
import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  REDIS_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  REDIS_PORT: number;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string;

  @IsString()
  @IsOptional()
  REDIS_USERNAME: string;
}

export default registerAs<RedisConfig>('redis', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
  };
});
