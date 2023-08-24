import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RedisService } from '../redis/redis.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async findAll(): Promise<string> {
    const value = await this.redisService.get();
    return 'This action returns all cats' + value;
  }

  @Get('/create')
  createUser(): Promise<User> {
    this.redisService.set();
    return this.usersService.create();
  }
}
