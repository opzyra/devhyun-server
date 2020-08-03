import expressLogging from "express-logging";
import { debugLogger } from "@/lib/logger";

export default expressLogging(debugLogger);
