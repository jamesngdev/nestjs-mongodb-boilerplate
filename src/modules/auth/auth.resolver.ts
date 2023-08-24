import { Args, Resolver, Mutation, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginWithLocalInput } from './dto/login-with-local.dto';
import { throwError } from '../../utils/error';
import { ErrorCode } from '../../constants/error-code';
import { User } from '../users/entities/user.entity';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@CurrentUser() user) {
    console.log('>> Current user: ', user);
    return {
      username: 'james',
      password: 'james',
    };
  }

  @Mutation(() => AuthResponseDto)
  async login(
    @Args('input') input: LoginWithLocalInput,
  ): Promise<AuthResponseDto> {
    const user = await this.authService.validateUser(
      input.username,
      input.password,
    );
    if (!user) {
      throwError(
        'Wrong username or password',
        ErrorCode.WRONG_USERNAME_OR_PASSWORD,
      );
    }
    const authResponse = await this.authService.login(user);
    return authResponse;
  }
}
