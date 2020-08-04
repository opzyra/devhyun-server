import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("comment", { synchronize: true })
export default class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ length: 255 })
  ip!: string;

  @Field()
  @Column({ length: 255 })
  name!: string;

  @Column({ length: 255 })
  password!: string;

  @Field()
  @Column({ length: 255 })
  email!: string;

  @Field()
  @Column({ length: 255 })
  thumbnail!: string;

  @Field()
  @Column({ type: "mediumtext" })
  contents!: string;

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
