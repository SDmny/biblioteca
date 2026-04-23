import express from "express";
import dotenv from "dotenv";
import { sendWelcomeEmail } from "./services/emailHandler.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Servidor backend funcionando"));

app.post("/api/send-email", async (req, res) => {
  const { to, name } = req.body;
  try {
    const result = await sendWelcomeEmail(to, { name });
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Servidor en http://localhost:3001"));
