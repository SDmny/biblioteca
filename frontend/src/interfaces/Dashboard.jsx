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
      // Buscar datos adicionales en tu tabla user
      const { data: userData } = await supabase
        .from("user")
        .select("username, role, email")
        .eq("id", user.id)
        .single();

      setCurrentUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!currentUser) {
    return <p>No has iniciado sesión</p>;
  }

  if (currentUser.rol === "admin") {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

export default Dashboard;
