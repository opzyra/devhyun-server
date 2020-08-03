import logger from "@/lib/logger";
import { GraphQLError } from "graphql";

export const formatError = (err: GraphQLError): GraphQLError => {
  logger.error(err.originalError);
  return err;
};
