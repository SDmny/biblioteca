import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase.js";

import Swal from "sweetalert2";
import BasicButton from "../../components/ui/BasicButton";
import SeeProfile from "../../components/user/SeeProfile";
import BackButton from "../../components/ui/BackButton";

function ProfileView({ user }) {
  const nav = useNavigate();

  const editPath =
    user?.role === "admin"
      ? `/admin/usuarios/edit/${user.usuario}`
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
        await supabase.from("user").delete().eq("id", user.id);
        await supabase.auth.signOut();
        nav("/");
      }
    });
  };

  if (!user) return <p>No autorizado</p>;

  return (
    <div className="main-container">
      <BackButton ruta="/" />
      <SeeProfile user={user}>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          <BasicButton to={editPath} texto={"Modificar datos"} />
          <BasicButton to={"/add-book"} texto={"Publicar libro"} />

          {user.role !== "admin" && (
            <button
              className="btn-main"
              style={{ height: "fit-content" }}
              onClick={() => nav("/my-books")}
            >
              Mis libros
            </button>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <button className="btn-main" onClick={() => nav("/reset-password")}>
            Cambiar contraseña
          </button>
        </div>

        {user.role !== "admin" && (
          <>
            <hr />
            <button
              className="btn-main w-100"
              style={{
                backgroundColor: "#dc3545",
                backgroundImage: "none",
                border: "none",
              }}
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
