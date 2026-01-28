import { Router } from "express";
import authMiddleware from "../Middlewares/authMiddleware.js";
import {
  createProject,
  getOpenProjects,
} from "../Controllers/project_controller.js";

const router = Router();

// CLIENT posts project
router.post("/", authMiddleware, createProject);

// ENGINEER views open projects
router.get("/open", authMiddleware, getOpenProjects);

export default router;
