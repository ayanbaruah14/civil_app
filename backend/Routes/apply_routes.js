import { Router } from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import { applyToProject } from "../Controllers/apply_controller.js";

const router = Router();

router.post("/", authMiddleware, applyToProject);

export default router;
