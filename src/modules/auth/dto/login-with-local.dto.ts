import { Field, InputType } from '@nestjs/graphql';

@InputType('LoginWithLocalInput')
export class LoginWithLocalInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
