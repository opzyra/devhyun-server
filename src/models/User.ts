import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("user", { synchronize: true })
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field({ nullable: true })
  @Column({ length: 100 })
  @Index({ unique: true })
  email!: string;

  @Column({ length: 50 })
  password!: string;
}
