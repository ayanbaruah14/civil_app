import Lead from "../Models/Lead.js";

/* CLIENT */
export const createLead = async (req, res) => {
  const lead = await Lead.create({
    ...req.body,
    client_id: req.user.id,
  });
  res.status(201).json(lead);
};
// Get my leads (IMPORTANT)
export const getMyLeads = async (req, res) => {
  const leads = await Lead.find({ client_id: req.user.id })
    .populate("applications.engineer_id", "engineer_type user_id")
    .sort({ createdAt: -1 });

  res.json(leads);
};

export const updateLeadStatus = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  lead.status = req.body.status;
  await lead.save();
  res.json(lead);
};

export const requestEngineer = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  lead.isOpen = false;
  lead.requestedEngineers.push(req.body.engineerId);
  await lead.save();
  res.json({ message: "Request sent" });
};

/* ENGINEER */
export const getOpenLeads = async (req, res) => {
  const leads = await Lead.find({
    isOpen: true,
    status: "active",
  }).populate("client_id", "name");
  res.json(leads);
};

export const getRequestedLeads = async (req, res) => {
  const leads = await Lead.find({
    requestedEngineers: req.user.engineerId,
    status: "active",
  }).populate("client_id", "name");
  res.json(leads);
};

export const applyToLead = async (req, res) => {
  const { leadId, quote } = req.body;

  const lead = await Lead.findById(leadId);

  const alreadyApplied = lead.applications.find(
    (a) => a.engineer_id.toString() === req.user.engineerId
  );
  if (alreadyApplied)
    return res.status(400).json("Already applied");

  lead.applications.push({
    engineer_id: req.user.engineerId,
    quote,
  });

  await lead.save();
  res.json({ message: "Applied successfully" });
};