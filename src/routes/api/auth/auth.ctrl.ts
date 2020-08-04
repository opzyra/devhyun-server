import { Request, Response } from "express";

import token from "@/lib/token";

import validator from "@/middleware/validator";
import { HttpError } from "@/middleware/error";

import { AuthBody } from "./auth.param";

import User from "@/models/User";

export const authValidate = validator.body(AuthBody);

export const auth = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as AuthBody;

  const user = await User.findByEmail(email);

  if (!user) {
    throw new HttpError("계정 정보가 없습니다.", 400);
  }
};
