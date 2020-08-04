import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";
import Post from "./Post";

@ObjectType()
@Entity("hit", { synchronize: true })
export default class Hit extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ length: 255 })
  ip!: string;

  // Hit(*) <-> Post(1)
  @Field(() => Post)
  @ManyToOne(() => Post, { cascade: true, eager: true })
  post!: Post;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}