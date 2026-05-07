import express from "express";
import cors from "cors";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import serverless from "serverless-http"; // Cambiado a import
import adminCreateUserRouter from "./admin/admin-create-user.js";

const app = express();
app.use(cors());
app.use(express.json());

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// --- CONFIGURACIÓN PARA NETLIFY ---
const router = express.Router();

// Montamos tus rutas existentes en el router
router.use("/admin", adminCreateUserRouter);

router.post("/admin/update-password", async (req, res) => {
  const { userId, newPassword } = req.body;
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    { password: newPassword },
  );
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Contraseña actualizada con éxito" });
});

router.delete("/admin/delete-user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (authError) throw authError;

    const { error: dbError } = await supabaseAdmin
      .from("user")
      .delete()
      .eq("id", id);
    if (dbError) throw dbError;

    return res.json({ message: "Usuario eliminado de raíz" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Esta es la clave: el router debe colgar de la ruta que Netlify espera
// Si tu archivo se llama server.js, usa '/.netlify/functions/server'
app.use("/.netlify/functions/server", router);

// Exportamos para Netlify
export const handler = serverless(app);

// Mantenemos esto solo para desarrollo local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Local backend en puerto ${PORT}`));
}
