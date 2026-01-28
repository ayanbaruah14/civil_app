let projects = []; // temporary in-memory store

export const createProject = (req, res) => {
  const { title, location, budget, floors } = req.body;

  if (!title || !location || !budget || !floors) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newProject = {
    _id: Date.now().toString(),
    title,
    location,
    budget,
    floors,
    status: "OPEN",
    client_id: req.user.id,
    client_phone: "9999999999", // dummy for now
  };

  projects.push(newProject);

  res.status(201).json(newProject);
};

export const getOpenProjects = (req, res) => {
  const openProjects = projects.filter(p => p.status === "OPEN");
  res.json(openProjects);
};
