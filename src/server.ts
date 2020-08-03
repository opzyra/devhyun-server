import app from "@/app";
import db from "@/lib/database";
import logger from "@/lib/logger";

const runServer = async () => {
  try {
    await db.getConnection();

    const server = await app.initApp();

    server.listen(process.env.APP_PORT, () => {
      logger.info(`Server is Running on port ${process.env.APP_PORT}`);
      logger.info(`PROJECT: ${process.env.APP_PROJECT}`);
      logger.info(`ENV: ${process.env.NODE_ENV}`);
      logger.info(`DOMAIN: ${process.env.APP_DOMAIN}`);
    });
  } catch (error) {
    logger.error(error);
  }
};

void runServer();
