import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const token = (req?.headers?.authorization).replace('Bearer ', '');
    if (!token || token.trim() === '') {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      req['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
