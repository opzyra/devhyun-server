import {
  createConnection,
  Connection,
  getConnectionManager,
  getConnection,
  EntityManager,
} from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import path from "path";
import logger from "./logger";

interface IContext {
  (arg1: EntityManager): Promise<void>;
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
  async transaction(context: IContext): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    const entityManager = queryRunner.manager;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await context(entityManager);
    } catch (error) {
      logger.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      async () => {
        await queryRunner.release();
      };
    }
  },
};

export default database;
