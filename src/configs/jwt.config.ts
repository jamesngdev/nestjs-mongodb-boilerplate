import { registerAs } from '@nestjs/config';
import { JWTConfig } from './config.type';
import validateConfig from '../utils/validate-config';
import { IsString } from 'class-validator';

class EnvironmentVariablesValidator {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRED: string;
}

export default registerAs<JWTConfig>('jwt', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpired: process.env.JWT_EXPIRED || '60s',
  };
});
