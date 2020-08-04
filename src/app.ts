import "reflect-metadata";
import "./env";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import sentry from "@/middleware/sentry";
import { endpoint, error } from "@/middleware/error";
import debug from "@/middleware/debug";

import { formatError } from "@/lib/graphql";

import routes from "@/routes";

const initApp = async (): Promise<Express> => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [__dirname + "/graphql/**/*Resolver.ts"],
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    formatError,
    debug: process.env.NODE_ENV !== "production",
  });

  apolloServer.applyMiddleware({ app });

  app.use(helmet());

  app.use("/uploads", express.static("uploads"));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cookieParser());

  app.use(routes);

  if (process.env.NODE_ENV == "production") {
    app.use(compression());
    app.use(sentry());
  } else {
    app.use(debug);
  }

  app.use(endpoint, error);

  return app;
};

export default {
  initApp,
};
