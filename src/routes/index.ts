/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== "index.ts" && file !== "index.js"
    )
    .map((file) => {
      const route = require(path.join(__dirname, file)).default;
      router.use(route);
    })
);

export default router;
