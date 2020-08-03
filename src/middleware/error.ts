/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import logger from "@/lib/logger";

export const endpoint = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({ message: "Not Found" });
  return;
};

export const error = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = error.message || "Internal Server Error";

  if (error.stack) {
    logger.error(error);
  }

  res.status(500).json({ message });
  return;
};
