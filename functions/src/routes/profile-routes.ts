import express from "express";
import RequestMiddleware from "../middleware/request-middleware";
import { ProfileGet } from "../handlers/profile";

const router = express.Router();

router.get("/:profileId", ProfileGet);

export default router;
