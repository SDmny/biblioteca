import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase.js";
import Swal from "sweetalert2";
import BasicButton from "../../components/ui/BasicButton";
import SeeProfile from "../../components/user/SeeProfile";
import BackButton from "../../components/ui/BackButton";

function ProfileView({ user: propUser }) {
  const nav = useNavigate();
  const [user, setUser] = useState(propUser || null);
  const [loading, setLoading] = useState(!propUser);

  useEffect(() => {
    if (!propUser) {
      const fetchUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data } = await supabase
            .from("user")
            .select("*")
            .eq("id", session.user.id)
            .single();
          
          if (data) {
            setUser({
              ...data,
              img: data.image_url,
              nombre: data.name,
              apellido: data.lastname,
              usuario: data.username
            });
          }
        }
        setLoading(false);
      };
      fetchUser();
    }
  }, [propUser]);

  const editPath = user?.role === "admin"
    ? `/admin/usuarios/edit/${user.username}`
    : "/profile-edit";

  const eliminarPerfil = () => {
    Swal.fire({
      title: "¿Eliminar tu cuenta?",
      text: "Esta acción borrará tus datos permanentemente y no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { error: dbError } = await supabase
            .from("user")
            .delete()
            .eq("id", user.id);

          if (dbError) throw dbError;

          await supabase.auth.signOut();
          
          Swal.fire("Eliminado", "Tu cuenta ha sido borrada.", "success").then(() => {
            window.location.href = "/";
          });
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la cuenta: " + error.message, "error");
        }
      }
    });
  };

  if (loading) return <div className="main-container"><p>Cargando...</p></div>;
  if (!user) return <div className="main-container"><p>No autorizado</p></div>;

  return (
    <div className="main-container">
      <BackButton ruta="/" />
      <SeeProfile user={user}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ fontWeight: "bold", fontSize: "1.8rem" }}>
            {user.username}
          </h2>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <BasicButton to={editPath} texto={"Modificar datos"} />
          <BasicButton to={"/add-book"} texto={"Publicar libro"} />

          {user.role !== "admin" && (
            <button className="btn-main" style={{ height: "fit-content" }} onClick={() => nav("/my-books")}>
              Mis libros
            </button>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <button className="btn-main" onClick={() => nav("/reset-password")}>
            Cambiar contraseña
          </button>
        </div>

        {user.role !== "admin" && (
          <>
            <hr />
            <button
              className="btn-main w-100"
              style={{ backgroundColor: "#dc3545", backgroundImage: "none", border: "none" }}
              onClick={eliminarPerfil}
            >
              Eliminar Perfil
            </button>
          </>
        )}
      </SeeProfile>
    </div>
  );
}

export default ProfileView;