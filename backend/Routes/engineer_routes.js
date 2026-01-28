import { Router } from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import { getAllEngineers } from "../Controllers/engineer_controller.js";

const router = Router();

router.get("/all", authMiddleware, getAllEngineers);

export default router;
