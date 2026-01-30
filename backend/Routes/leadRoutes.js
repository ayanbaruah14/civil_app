import express from "express";
import {
  createLead,
  updateLeadStatus,
  requestEngineer,
  getOpenLeads,
  getRequestedLeads,
  applyToLead,
  getMyLeads,
} from "../Controllers/leadController.js";
import auth from "../Middlewares/authMiddleware.js";

const Lead_router = express.Router();

/* Client */
Lead_router.get("/my",auth,getMyLeads);
Lead_router.post("/", auth, createLead);
Lead_router.patch("/:id/status", auth, updateLeadStatus);
Lead_router.post("/:id/request", auth, requestEngineer);

/* Engineer */
Lead_router.get("/open", auth, getOpenLeads);
Lead_router.get("/requested", auth, getRequestedLeads);
Lead_router.post("/:id/apply", auth, applyToLead);

export default Lead_router;