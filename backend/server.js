// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendWelcomeEmail } from "./services/emailHandler.js";

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS (permitir llamadas desde tu frontend)
app.use(
  cors({
    origin: "http://localhost:5173", // origen del frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Ruta raíz para comprobar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando ");
});

// Endpoint para enviar correo
app.post("/api/send-email", async (req, res) => {
  const { to, name } = req.body;
  try {
    const result = await sendWelcomeEmail(to, { name });
    res.json({ success: true, result });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
