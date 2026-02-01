import jwt from "jsonwebtoken";
import User from "../Models/user.js";
import Engineer from "../Models/engineer.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    if (req.user.role === "ENGINEER") {
      const engineer = await Engineer.findOne({ user_id: req.user.id });

      if (!engineer) {
        return res.status(404).json({
          message: "Engineer profile not found",
        });
      }

      req.user.engineerId = engineer._id;
    }

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
