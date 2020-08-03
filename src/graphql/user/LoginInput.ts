import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export default class LoginInput {
  @IsEmail()
  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  password!: string;
}
