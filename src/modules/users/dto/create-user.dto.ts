import { Field, InputType } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  password: string;
}
