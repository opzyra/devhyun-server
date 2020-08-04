declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }
  interface ProcessEnv {
    /** node environment */
    NODE_ENV: string;
    APP_PORT: string;
    APP_PROJECT: string;
    APP_DOMAIN: string;

    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_LOGGING: string;
    DB_SYNCHRONIZE: string;

    SENTRY_DSN: string;

    JWT_DOMAIN: string;
    JWT_SECRET: string;
    JWT_ACCESS_EXPIRE: string;
    JWT_REFRESH_EXPIRE: string;
    JWT_COOKIE_NAME: string;
  }
}

declare namespace Express {
  interface Request {
    user?: import("@/models/user").default;
  }
}

declare module "node-mkdirs" {
  import { MakeDirectoryOptions } from "fs";

  function mkdirs(folderPath: string, mode?: MakeDirectoryOptions): void;

  export default mkdirs;
}

declare module "express-asyncify" {
  import { Application, Router } from "express";

  function asyncify(ap: Application | Router): Application | Router;

  export default asyncify;
}

declare module "express-logging" {
  import { RequestHandler } from "express";
  import { Logger } from "winston";

  interface IOpts {
    blacklist: Array<string>;
    policy: {
      message: string;
    };
  }

  function logging(logger: Logger, opts?: IOpts): RequestHandler;

  export default logging;
}
