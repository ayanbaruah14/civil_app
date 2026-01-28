export const applyToProject = (req, res) => {
  const { project_id, quote } = req.body;

  if (!project_id || !quote) {
    return res.status(400).json({ message: "Project ID and quote required" });
  }

  console.log("ENGINEER:", req.user.id);
  console.log("APPLIED TO:", project_id);
  console.log("QUOTE:", quote);

  res.json({ message: "Applied successfully" });
};
