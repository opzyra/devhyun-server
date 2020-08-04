import asyncify from "@/lib/asyncify";

import { auth, authValidate } from "./auth.ctrl";

const router = asyncify();

router.post("/", authValidate, auth);

export default router;
