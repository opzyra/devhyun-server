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
import Post from "@/models/Post";

@ObjectType()
@Entity("like", { synchronize: true })
export default class Like extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Index({ unique: true })
  @Column({ length: 255 })
  ip!: string;

  // Like(*) <-> Post(1)
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
