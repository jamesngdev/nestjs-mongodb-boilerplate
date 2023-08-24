import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { User as UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: {
        id: new ObjectId(id),
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}
