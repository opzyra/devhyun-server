/* eslint-disable @typescript-eslint/ban-types */
import { Response } from "express";

import jwt from "jsonwebtoken";

const {
  JWT_DOMAIN,
  JWT_SECRET,
  JWT_ACCESS_EXPIRE,
  JWT_REFRESH_EXPIRE,
  JWT_COOKIE_NAME,
} = process.env;

export interface IPayload {
  user: string;
  token?: string;
}

const generate = (payload: IPayload, refresh?: boolean): string => {
  return jwt.sign(payload, JWT_SECRET, {
    issuer: JWT_DOMAIN,
    expiresIn: refresh ? JWT_REFRESH_EXPIRE : JWT_ACCESS_EXPIRE,
  });
};

const decode = (token: string): object | string => {
  return jwt.verify(token, JWT_SECRET);
};

const setCookie = (
  res: Response,
  tokens: { access: string; refresh: string }
): void => {
  res.cookie(JWT_COOKIE_NAME, tokens.access, {
    httpOnly: true,
    maxAge: parseInt(JWT_ACCESS_EXPIRE),
  });

  res.cookie(JWT_COOKIE_NAME, tokens.refresh, {
    httpOnly: true,
    maxAge: parseInt(JWT_REFRESH_EXPIRE),
  });
};

export default {
  generate,
  decode,
  setCookie,
};
