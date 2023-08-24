import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.findByUsername(username);
    if (user.password === password) {
      return user;
    }
    return undefined;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload);

    return {
      access: {
        token: accessToken,
        expiredAt: new Date(),
      },
      refresh: {
        token: refreshToken,
        expiredAt: new Date(),
      },
    };
  }
}
