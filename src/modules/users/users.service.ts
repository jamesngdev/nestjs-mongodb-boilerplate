import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(): Promise<User> {
    return this.usersRepository.save({
      name: 'James_' + Math.random(),
      password: Math.random().toString(),
    });
  }
}
