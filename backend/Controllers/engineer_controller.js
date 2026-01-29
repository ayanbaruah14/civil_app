import Engineer from "../Models/engineer.js";

export const getAllEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find()
      .populate("user_id", "name email") 
      .sort({ createdAt: -1 }); // latest first 

    res.status(200).json(engineers);
  } catch (error) {
    console.error("Error fetching engineers:", error);
    res.status(500).json({ message: "Failed to fetch engineers" });
  }
};
