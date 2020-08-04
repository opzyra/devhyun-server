import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("temp", { synchronize: true })
export default class Temp extends BaseEntity {
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
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
