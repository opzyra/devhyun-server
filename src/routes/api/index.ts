import express from "express";

import upload from "./upload";
import auth from "./auth";

const router = express.Router();

router.use("/upload", upload);
router.use("/auth", auth);

export default router;
