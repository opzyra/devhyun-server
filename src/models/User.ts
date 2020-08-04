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
@Entity("user", { synchronize: true })
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ length: 255 })
  @Index({ unique: true })
  email!: string;

  @Column({ length: 150 })
  password!: string;

  @Field({ nullable: true })
  @Column({ length: 255 })
  role!: string;

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  static async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        email,
      },
    });
  }
}
