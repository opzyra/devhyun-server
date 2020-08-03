import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";

import Post from "@/models/Post";

@ObjectType()
@Entity("series", { synchronize: true })
export default class Series extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ length: 100 })
  title!: string;

  @Field()
  @Column({ length: 100 })
  @Index({ unique: true })
  path!: string;

  @Field()
  @Column({ length: 200 })
  thumbnail!: string;

  @Field()
  @Column({ type: "mediumtext" })
  contents!: string;

  @Field()
  @Column()
  hit!: number;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // Series(1) <-> Post(*)
  @Field(() => Post)
  @OneToMany(() => Post, (post) => post.series)
  posts!: Post[];
}
