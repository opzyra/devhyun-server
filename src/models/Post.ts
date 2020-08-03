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
  ManyToOne,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";
import Series from "@/models/Series";

@ObjectType()
@Entity("post", { synchronize: true })
export default class Post extends BaseEntity {
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

  // Post(*) <-> Series(1)
  @Field(() => Series)
  @ManyToOne(() => Series, (series) => series.posts)
  series!: Series;

  // User(*) <-> Role(*)
  // @ManyToMany(() => Role, { onDelete: "CASCADE" })
  // @JoinTable({ name: "users_roles" })
  // roles!: Role[];
}
