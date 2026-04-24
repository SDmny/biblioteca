import { useEffect, useState } from "react";

import { supabase } from "../utils/supabase.js";
import UserDashboard from "../interfaces/user/ProfileView.jsx";
import AdminDashboard from "../interfaces/admin/AdminDashboard.jsx";

function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      // Consulta a tu tabla user
      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("username, role, email")
        .eq("id", user.id) // 👈 debe coincidir con auth.uid()
        .single();

      if (userError) {
        console.error("Error al obtener perfil:", userError.message);
        setCurrentUser(null);
      } else {
        setCurrentUser(userData);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!currentUser) return <p>No has iniciado sesión</p>;

  return currentUser.role === "admin" ? (
    <AdminDashboard />
  ) : (
    <UserDashboard user={currentUser} />
  );
}

export default Dashboard;
