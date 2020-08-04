import * as fns from "date-fns";

import encoder from "@/lib/encoder";
import token from "@/lib/token";
import { transactional } from "@/lib/database";

import validator from "@/middleware/validator";
import { HttpError } from "@/middleware/error";

import { AuthBody } from "./auth.param";

import User from "@/models/User";
import Token from "@/models/Token";

export const authValidate = validator.body(AuthBody);

export const auth = transactional(
  async (req, res, entityManager): Promise<void> => {
    const { email, password } = req.body as AuthBody;

    const user = await User.findByEmail(email);

    if (!user) {
      throw new HttpError({ status: 400, message: "계정 정보가 없습니다." });
    }

    const match = await encoder.match(password, user.password);

    if (!match) {
      throw new HttpError({ status: 400, message: "비밀번호를 확인해주세요." });
    }

    const accessToken = token.generate({ user: user.id });

    const savedToken = (await Token.findByUserId(user.id)) || new Token();
    savedToken.user = user;
    savedToken.expiredAt = fns.add(new Date(), { days: 30 });

    await entityManager.save(savedToken);

    const refreshToken = token.generate(
      { user: user.id, token: savedToken.id },
      true
    );
    res.json({ accessToken, refreshToken });
  }
);
