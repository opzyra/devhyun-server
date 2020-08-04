import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
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

  @Column()
  expiredAt!: Date;

  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  static async findByUserId(userId: string): Promise<Token | undefined> {
    return await this.findOne({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
