import Lead from "../Models/Lead.js";
import Engineer from "../Models/engineer.js";
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
  try {
    const leads = await Lead.find({ client_id: req.user.id })
      .populate({
        path: "applications.engineer_id",
        model: "Engineer", 
        populate: {
          path: "user_id",
          model: "User",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(leads);
  } catch (err) {
    console.error("getMyLeads error:", err);
    res.status(500).json({ message: "Failed to fetch my leads" });
  }
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
  try {
    const { leadId, quote } = req.body;
    const engineerId = req.user.engineerId;

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // ❌ Do not allow apply on completed leads
    if (lead.status === "completed") {
      return res.status(400).json({ message: "Lead already completed" });
    }

    // ✅ Safe check (handles empty array)
    const alreadyApplied = lead.applications?.some(
      (app) => app.engineer_id.toString() === engineerId.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this lead" });
    }

    // ✅ Correct application object
    lead.applications.push({
      engineer_id: engineerId,
      quote,
      appliedAt: new Date(),
    });

    await lead.save();

    // ✅ Keep Engineer collection in sync
    await Engineer.findByIdAndUpdate(engineerId, {
      $addToSet: { appliedLeads: leadId },
    });

    res.status(200).json({ message: "Applied successfully" });
  } catch (err) {
    console.error("applyToLead error:", err);
    res.status(500).json({ message: "Apply failed" });
  }
};



export const getAppliedLeads = async (req, res) => {
  try {
    const engineer = await Engineer.findById(req.user.engineerId)
      .populate({
        path: "appliedLeads",
        model: "Lead",
        select: "title location budget status",
      });

    res.json(engineer.appliedLeads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applied leads" });
  }
};


