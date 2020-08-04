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
import Series from "./Series";
import Tag from "./Tag";

@ObjectType()
@Entity("post", { synchronize: true })
export default class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ length: 255 })
  @Index({ unique: true })
  title!: string;

  @Field()
  @Column({ length: 255 })
  thumbnail!: string;

  @Field()
  @Column({ type: "mediumtext" })
  contents!: string;

  @Field()
  @Column({ default: 0 })
  hits!: number;

  @Field()
  @Column({ default: 0 })
  likes!: number;

  // Post(*) <-> Tag(*)
  @Field(() => Tag)
  @ManyToMany(() => Tag, { onDelete: "CASCADE" })
  @JoinTable({ name: "post_tag" })
  tags!: Tag[];

  // Post(*) <-> Series(1)
  @Field(() => Series)
  @ManyToOne(() => Series, (series) => series.posts)
  series!: Series;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
