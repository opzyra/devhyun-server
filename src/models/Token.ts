import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import User from "@/models/User";
import { Field } from "type-graphql";

@Entity("token", { synchronize: true })
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // Token(1) <-> User(1)
  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
