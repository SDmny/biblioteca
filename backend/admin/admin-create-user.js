// admin-create-user.js
import express from "express";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// Cliente con service_role (solo backend)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

router.post("/admin-create-user", async (req, res) => {
  const { email, password, name, lastname, birthdate, username, role } =
    req.body;

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, lastname, birthdate, username, role },
    });

    if (error) throw error;

    res.status(201).json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
