import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  hello() {
    return {
      name: 'Minh Tri',
    };
  }

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserDto): Promise<User> {
    return this.usersService.createUser(input);
  }
}
