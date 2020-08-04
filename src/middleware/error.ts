/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import logger from "@/lib/logger";

export class HttpError implements MiddlewareError {
  status?: number | undefined;
  statusCode?: string | number | undefined;
  status_code?: string | number | undefined;
  output?: { statusCode?: string | number | undefined } | undefined;
  message: string;
  name: string;
  stack?: string | undefined;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
    this.name = "HttpError";
  }
}

export interface MiddlewareError extends Error {
  status?: number | string;
  statusCode?: number | string;
  status_code?: number | string;
  output?: {
    statusCode?: number | string;
  };
}

export const endpoint = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({ message: "Not Found" });
  return;
};

export const error = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = error.message || "Internal Server Error";
  const status = error.status || 500;

  if (error.stack) {
    logger.error(error);
  }

  res.status(status).json({ message });
  return;
};
