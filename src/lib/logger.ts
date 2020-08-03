import winston from "winston";
import moment from "moment";
import DailyRotateFile from "winston-daily-rotate-file";

export const errorLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "error",
      format: winston.format.printf(
        (info) =>
          `${moment().format("YYYY-MM-DD HH:mm:ss.SSS")} [ERROR]: ${
            info.message
          }`
      ),
    }),
    new DailyRotateFile({
      filename: "logs/error.log",
      zippedArchive: false,
      format: winston.format.printf(
        (info) =>
          `${moment().format("YYYY-MM-DD HH:mm:ss.SSS")} [ERROR]: ${
            info.message
          }`
      ),
    }),
  ],
});

export const infoLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.message}`)
      ),
    }),
  ],
});

export const debugLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "productionuction" ? "info" : "debug",
      format: winston.format.printf(
        (info) =>
          `${moment().format("YYYY-MM-DD HH:mm:ss.SSS")} [DEBUG]: ${
            info.message
          }`
      ),
    }),
  ],
});

const logger = {
  error: (e: Error | null | undefined, message?: string): void => {
    if (e instanceof Error && e.stack) {
      errorLogger.error(`${e.message}\r\n${e.stack}`);
    }
    message && errorLogger.error(message);
  },
  debug: (message: string): void => {
    debugLogger.debug(message);
  },
  info: (message: string): void => {
    infoLogger.info(message);
  },
};

export default logger;
