import express from "express";
import cors from "cors";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import adminCreateUserRouter from "./admin/admin-create-user.js";

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Supabase Admin con SERVICE_ROLE_KEY
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.use("/api", adminCreateUserRouter);

// Actualizar contraseña
app.post("/api/admin/update-password", async (req, res) => {
  const { userId, newPassword } = req.body;
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    { password: newPassword }
  );
  if (error) return res.status(400).json({ error: error.message });
  return res.json({ message: "Contraseña actualizada con éxito" });
});

// Borrar usuario permanentemente
app.delete("/api/admin/delete-user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Borrar de Supabase Auth (Sistema de autenticación)
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (authError) throw authError;

    // 2. Borrar de la tabla pública 'user'
    const { error: dbError } = await supabaseAdmin
      .from("user")
      .delete()
      .eq("id", id);
    if (dbError) throw dbError;

    return res.json({ message: "Usuario eliminado de raíz" });
  } catch (error) {
    console.error("Error al eliminar:", error.message);
    return res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});