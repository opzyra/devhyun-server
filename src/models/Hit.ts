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
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
