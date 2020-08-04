import express from "express";
import api from "@/routes/api";

const router = express.Router();

router.use("/api", api);

router.get("/", (req, res) => {
  res.send("Devhyun");
});

export default router;
