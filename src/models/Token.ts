import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

import User from "@/models/User";

@Entity("token", { synchronize: true })
export default class Token extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Token(1) <-> User(1)
  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}
