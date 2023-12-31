import { Field, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class CreateUserDto {
  @Field()
  username: string;

  @Field()
  password: string;
}
