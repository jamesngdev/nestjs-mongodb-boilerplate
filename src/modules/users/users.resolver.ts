import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello!';
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserDto): Promise<User> {
    return this.usersService.createUser(input);
  }
}
