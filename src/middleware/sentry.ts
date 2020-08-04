import { IncomingMessage, ServerResponse } from "http";
import * as Sentry from "@sentry/node";

import { MiddlewareError } from "./error";

export default function sentryHandler(): (
  error: MiddlewareError,
  req: IncomingMessage,
  res: ServerResponse,
  next: (error: MiddlewareError) => void
) => void {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });

  return Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (error.status === 500) {
        return true;
      }
      return false;
    },
  });
}
