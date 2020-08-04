import { Request, Response } from "express";

import validator from "@/middleware/validator";

import upload from "@/lib/upload";

import { UploadBody } from "./upload.param";

export const uploadValidate = validator.body(UploadBody);

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const image = await upload.image(req, res);
  res.json(image);
};
