/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from "express";
import { ClassType } from "class-transformer/ClassTransformer";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export default class Validator {
  static query(param: ClassType<Object>, skipMissingProperties = false) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const validatorErrors = await validate(plainToClass(param, req.query), {
        skipMissingProperties,
      });

      if (validatorErrors.length === 0) {
        next();
        return;
      }

      const errors = validatorErrors.map(
        (error) =>
          error.constraints && {
            value: error.value,
            property: error.property,
            messages: Object.values(error.constraints),
          }
      );

      res.status(400).json({
        errors,
        message: "Validation Error occured",
      });
      return;
    };
  }
  static body(type: ClassType<Object>, skipMissingProperties = false) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const validatorErrors = await validate(plainToClass(type, req.body), {
        skipMissingProperties,
      });

      if (validatorErrors.length === 0) {
        next();
        return;
      }

      const errors = validatorErrors.map(
        (error) =>
          error.constraints && {
            value: error.value,
            property: error.property,
            messages: Object.values(error.constraints),
          }
      );

      res.status(400).json({
        errors,
        message: "Validation Error occured",
      });
      return;
    };
  }
}
