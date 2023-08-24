import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  controllers: [UsersController],
  providers: [UsersService, RedisService],
  exports: [UsersService],
})
export class UsersModule {}
