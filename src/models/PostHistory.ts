import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";
import Post from "./Post";

@ObjectType()
@Entity("post_history", { synchronize: true })
export default class PostHistory extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // PostHistory(*) <-> Post(1)
  @Field(() => Post)
  @ManyToOne(() => Post, { cascade: true })
  post!: Post;

  @Field()
  @Column({ length: 255 })
  title!: string;

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
