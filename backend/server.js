import express from "express";
import cors from "cors";
import "./config/db.js"
import router from "./Routes/auth_rt.js";
import projectRoutes from "./Routes/project_routes.js";
import engineerRoutes from "./Routes/engineer_routes.js";
import applyRoutes from "./Routes/apply_routes.js";


const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cors());
app.use("/api/auth", router);
app.use("/api/project", projectRoutes);
app.use("/api/engineer", engineerRoutes);
app.use("/api/apply", applyRoutes);


app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
