/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import logger from "@/lib/logger";
import { ValidationError } from "class-validator";

interface IErrorProps {
  status: number;
  message: string;
  errors?: (
    | {
        value: any;
        property: string;
        messages: string[];
      }
    | undefined
  )[];
  stack?: string;
}

export class HttpError implements MiddlewareError {
  status?: number | undefined;
  statusCode?: string | number | undefined;
  status_code?: string | number | undefined;
  output?: { statusCode?: string | number | undefined } | undefined;
  message: string;
  name: string;
  stack?: string | undefined;
  errors?: (
    | {
        value: any;
        property: string;
        messages: string[];
      }
    | undefined
  )[];

  constructor(props: IErrorProps) {
    const { message, status, errors, stack } = props;
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.stack = stack;
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
  const errors = error.errors;

  if (error.stack) {
    logger.error(error);
  }

  res.status(status).json({ message, errors });
  return;
};
