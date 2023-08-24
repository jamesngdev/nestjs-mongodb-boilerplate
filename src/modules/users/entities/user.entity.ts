import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ length: 500 })
  name: string;

  @Column()
  password: string;
}
