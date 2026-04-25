// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import adminCreateUserRouter from "./admin/admin-create-user.js";

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use("/api", adminCreateUserRouter);

// Arrancar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
