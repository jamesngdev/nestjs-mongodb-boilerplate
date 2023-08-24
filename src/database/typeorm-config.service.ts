import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../configs/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
