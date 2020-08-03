import validator from "@/middleware/validator";
import asyncify from "@/lib/asyncify";
import upload from "@/lib/upload";

import UploadParam from "@/param/UploadParam";

const router = asyncify();

router.post("/upload", validator.body(UploadParam), async (req, res) => {
  const image = await upload.image(req, res);
  res.json(image);
});

export default router;
