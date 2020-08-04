import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";

import { ObjectType, Field, ID } from "type-graphql";
import Series from "./Series";

@ObjectType()
@Entity("series_path", { synchronize: true })
export default class SeriesPath extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ length: 255 })
  @Index({ unique: true })
  path!: string;

  // SeriesPath(*) <-> Series(1)
  @Field(() => Series)
  @ManyToOne(() => Series, { cascade: true })
  sereis!: Series;

  @Field()
  @CreateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ precision: null, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
