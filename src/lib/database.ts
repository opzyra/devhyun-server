/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createConnection,
  Connection,
  getConnectionManager,
  getConnection,
  EntityManager,
} from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { Request, Response, NextFunction } from "express";

import path from "path";
import { HttpError } from "@/middleware/error";
import logger from "./logger";

interface IContext {
  (
    arg1: Request,
    arg2: Response,
    arg3: EntityManager,
    arg4?: NextFunction
  ): Promise<void>;
}

const database = {
  connectionManager: getConnectionManager(),
  async connect(): Promise<Connection> {
    return await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [path.join(process.cwd() + "/src/models/*.ts")],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: process.env.DB_SYNCHRONIZE === "true",
      logging: process.env.DB_LOGGING === "true",
    });
  },
  async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = "default";
    if (this.connectionManager.has(CONNECTION_NAME)) {
      const connection = this.connectionManager.get(CONNECTION_NAME);
      try {
        if (connection.isConnected) {
          await connection.close();
        }
      } catch (error) {
        logger.error(error);
      }
      return connection.connect();
    }
    return await this.connect();
  },
};

export const transactional = (context: IContext) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const entityManager = queryRunner.manager;

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await context(req, res, entityManager, next);
      await queryRunner.commitTransaction();
    } catch (error) {
      const stack = (error as HttpError).stack || undefined;
      const message = (error as HttpError).message || "Internal Server Error";
      const status = (error as HttpError).status || 500;

      await queryRunner.rollbackTransaction();
      throw new HttpError({
        status,
        message,
        stack,
      });
    } finally {
      await queryRunner.release();
    }
  };
};

export default database;
