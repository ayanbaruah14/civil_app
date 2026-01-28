export const getAllEngineers = (req, res) => {
  res.json([
    {
      _id: "1",
      engineer_type: "Civil",
      experience: 5,
      max_degree: "B.Tech",
      user_id: { name: "Rahul Sharma" },
    },
    {
      _id: "2",
      engineer_type: "Structural",
      experience: 8,
      max_degree: "M.Tech",
      user_id: { name: "Amit Verma" },
    },
  ]);
};
