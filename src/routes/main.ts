import asyncify from "@/lib/asyncify";

const router = asyncify();

router.get("/", (req, res) => {
  res.json({ message: "server!" });
});

export default router;
