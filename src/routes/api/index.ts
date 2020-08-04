import express from "express";

import upload from "@/routes/api/upload";
import auth from "@/routes/api/auth";

const router = express.Router();

router.use("/upload", upload);
router.use("/auth", auth);

export default router;
