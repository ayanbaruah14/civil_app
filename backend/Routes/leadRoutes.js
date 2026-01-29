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

const lead_router = express.Router();

/* Client */
lead_router.get("/my",auth,GetMyProjects)
lead_router.post("/", auth, createLead);
lead_router.patch("/:id/status", auth, updateLeadStatus);
lead_router.post("/:id/request", auth, requestEngineer);

/* Engineer */
lead_router.get("/open", auth, getOpenLeads);
lead_router.get("/requested", auth, getRequestedLeads);
lead_router.post("/:id/apply", auth, applyToLead);

export default lead_router;
