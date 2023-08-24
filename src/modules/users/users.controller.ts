import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<string> {
    return 'This action returns all cats';
  }

  @Get('/create')
  createUser(): Promise<User> {
    return this.usersService.create();
  }
}
