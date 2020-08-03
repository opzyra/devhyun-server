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
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("comment", { synchronize: true })
export default class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ length: 100 })
  @Index({ unique: true })
  title!: string;

  @Field()
  @Column({ length: 200 })
  thumbnail!: string;

  @Field()
  @Column({ type: "text" })
  contents!: string;

  @Field()
  @Column()
  hit!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // User(*) <-> Role(*)
  // @ManyToMany(() => Role, { onDelete: "CASCADE" })
  // @JoinTable({ name: "users_roles" })
  // roles!: Role[];
}
