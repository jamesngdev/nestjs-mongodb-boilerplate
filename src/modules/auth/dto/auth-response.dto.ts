import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class TokenDto {
  @Field(() => String)
  token: string;

  @Field(() => Date)
  expiredAt: Date;
}

@ObjectType()
export class AuthResponseDto {
  @Field()
  access: TokenDto;

  @Field()
  refresh: TokenDto;
}
