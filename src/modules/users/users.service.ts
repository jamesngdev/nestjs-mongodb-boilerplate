import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { throwError } from '../../utils/error';
import { ErrorCode } from '../../constants/error-code';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const existsUser = await this.findByUsername(user.username);
    if (existsUser) {
      throwError('User exists', ErrorCode.USER_EXISTS);
    }
    return this.usersRepository.save(user);
  }
}
