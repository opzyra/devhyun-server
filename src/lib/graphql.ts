import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { AuthChecker } from "type-graphql";
import { GraphQLError } from "graphql";

import logger from "@/lib/logger";

import User from "@/models/User";

import token, { IPayload } from "./token";

interface IContext {
  user: User | undefined;
}

export const formatError = (err: GraphQLError): GraphQLError => {
  logger.error(err.originalError);
  return err;
};

export const context = async ({ req }: ExpressContext): Promise<IContext> => {
  if (!req.headers.authorization) return { ...req, user: undefined };

  try {
    const accessToken = req.headers.authorization.substr(7);
    const payload = token.decode(accessToken) as IPayload;

    const user = await User.findOne(payload.user);
    return { ...req, user };
  } catch (error) {
    return { ...req, user: undefined };
  }
};

export const authChecker: AuthChecker<IContext> = (
  { context: { user } },
  roles
) => {
  if (roles.length === 0) {
    return user !== undefined;
  }

  if (!user) {
    return false;
  }
  if (roles.includes(user.role)) {
    return true;
  }

  return false;
};
