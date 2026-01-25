import express from "express";
import cors from "cors";
import "./config/db.js"
import router from "./Routes/auth_rt.js";
const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cors());
app.use("/auth", router);



app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
