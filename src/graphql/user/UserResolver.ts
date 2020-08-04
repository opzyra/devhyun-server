import { Query, Resolver, Arg, Authorized } from "type-graphql";
import User from "@/models/User";

import LoginInput from "./LoginInput";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async login(@Arg("param") param: LoginInput): Promise<LoginInput> {
    const user = new User();
    user.email = "opzyra@nnd";
    return user;
  }

  @Authorized("USER")
  @Query(() => User, { nullable: true })
  async test(): Promise<User> {
    const [user, count] = await User.findAndCount();
    return user[0];
  }
}
