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

      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("id, username, role, email, name, lastname, image_url")
        .eq("id", user.id)
        .single();

      if (userError) {
        console.error("Error al obtener perfil:", userError.message);
        setCurrentUser(null);
      } else {
        setCurrentUser({
          ...userData,
          nombre: userData.name,
          apellido: userData.lastname,
          usuario: userData.username,
          img: userData.image_url
        });
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return (
    <div className="main-container">
      <p>Cargando...</p>
    </div>
  );

  if (!currentUser) return (
    <div className="main-container">
      <p>No has iniciado sesión</p>
    </div>
  );

  return currentUser.role === "admin" ? (
    <AdminDashboard />
  ) : (
    <UserDashboard user={currentUser} />
  );
}

export default Dashboard;