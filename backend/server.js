// server.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Resend } from "resend";

// Cargar variables de entorno desde .env
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Inicializar Resend con tu API key
const resend = new Resend(process.env.VITE_RESEND_API_KEY);

// Ruta raíz para comprobar que el servidor funciona
app.get("/", (req, res) => {
  res.send("backend funcionando");
});

// Endpoint para enviar correo
app.post("/api/send-email", async (req, res) => {
  const { to, name } = req.body;

  try {
    const result = await resend.emails.send({
      from: "tuapp@dominio.com", // debe ser un dominio verificado en Resend
      to,
      subject: "Bienvenido a la aplicación",
      html: `<p>Hola ${name}, gracias por registrarte en nuestra plataforma.</p>`,
    });

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
