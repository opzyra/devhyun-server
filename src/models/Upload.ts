import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("upload", { synchronize: true })
export default class Upload extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ length: 255 })
  mimetype!: string;

  @Field()
  @Column({ length: 255 })
  password!: string;

  @Field()
  @Column({ length: 255 })
  extension!: string;

  @Field()
  @Column({ length: 255 })
  name!: string;

  @Field()
  @Column({ length: 255 })
  src!: string;

  @Field()
  @Column()
  size!: number;

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
