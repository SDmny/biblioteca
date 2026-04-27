import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// Cliente con service_role
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// Ruta para crear
router.post("/admin-create-user", async (req, res) => {
  const { email, password, name, lastname, birthdate, username, role } = req.body;

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, lastname, birthdate, username, role },
    });

    if (error) throw error;

    res.status(201).json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/admin-update-user", async (req, res) => {
  const { userId, email, password } = req.body;

  try {
    const updateData = {};
    if (email) {
      updateData.email = email;
      updateData.email_confirm = true;
    }
    if (password) updateData.password = password;

    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      updateData
    );

    if (error) throw error;

    res.status(200).json({ message: "Usuario actualizado", user: data.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;