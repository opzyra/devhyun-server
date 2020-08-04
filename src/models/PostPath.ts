import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";
import Post from "./Post";

@ObjectType()
@Entity("post_path", { synchronize: true })
export default class PostPath extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ length: 255 })
  @Index({ unique: true })
  path!: string;

  // PostPath(*) <-> Post(1)
  @Field(() => Post)
  @ManyToOne(() => Post, { cascade: true })
  post!: Post;

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
