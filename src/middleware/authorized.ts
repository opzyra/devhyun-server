import { Request, Response, NextFunction } from "express";

import token, { IPayload } from "@/lib/token";

import User from "@/models/User";

import { HttpError } from "./error";

const anonymous = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;
    if (!authorization) {
      return next();
    }

    throw new HttpError({ status: 401, message: "Unauthorized Error" });
  };
};

const authorized = (...roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpError({ status: 401, message: "Unauthorized Error" });
    }

    const accessToken = authorization.substr(7);

    const payload = token.decode(accessToken) as IPayload;

    const user = await User.findOne(payload.user);
    req.user = user;

    if (roles.length === 0) {
      return next();
    }

    if (user?.role && roles.includes(user?.role)) {
      req.user = user;
      return next();
    }

    throw new HttpError({ status: 403, message: "Forbidden" });
  };
};

export default {
  anonymous,
  authorized,
};
