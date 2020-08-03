import { Query, Resolver, Arg } from "type-graphql";
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
}
