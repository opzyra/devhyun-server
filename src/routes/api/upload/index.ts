import asyncify from "@/lib/asyncify";

import { uploadImage, uploadValidate } from "./upload.ctrl";

const router = asyncify();

router.post("/image", uploadValidate, uploadImage);

export default router;
