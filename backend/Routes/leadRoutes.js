import express from "express";
import {
  createLead,
  updateLeadStatus,
  requestEngineer,
  getOpenLeads,
  getRequestedLeads,
  applyToLead,
} from "../Controllers/leadController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* Client */
router.post("/", auth, createLead);
router.patch("/:id/status", auth, updateLeadStatus);
router.post("/:id/request", auth, requestEngineer);

/* Engineer */
router.get("/open", auth, getOpenLeads);
router.get("/requested", auth, getRequestedLeads);
router.post("/:id/apply", auth, applyToLead);

export default router;
