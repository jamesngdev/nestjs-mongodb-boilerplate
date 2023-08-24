import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('User')
export class User {
  @ObjectIdColumn()
  @Field(() => String)
  id: ObjectId;

  @Field(() => String)
  @Column({ length: 500 })
  username: string;

  @Field(() => String)
  @Column()
  password: string;
}
