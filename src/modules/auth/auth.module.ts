import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<AllConfigType>) => ({
        global: true,
        secret: configService.get('jwt.jwtSecret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('jwt.jwtExpired', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [UsersService, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
