import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BasicButton from "../../components/ui/BasicButton";
import SeeProfile from "../../components/user/SeeProfile";
import BackButton from "../../components/ui/BackButton";

function ProfileView() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const editPath = user?.rol === "admin" 
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
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter((u) => u.usuario !== user.usuario);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.removeItem("user");
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
            marginBottom: 10
          }}
        >
          <BasicButton to={editPath} texto={"Modificar datos"} />
          <BasicButton to={"/add-book"} texto={"Publicar libro"} />

          {user.rol !== "admin" && (
            <button
              className="btn-main"
              style={{ height: "fit-content" }}
              onClick={() => nav("/my-books")}
            >
              Mis libros
            </button>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <button 
            className="btn-main" 
            onClick={() => nav("/reset-password")}
          >
            Cambiar contraseña
          </button>
        </div>

        {user.rol !== "admin" && (
          <>
            <hr />
            <button
              className="btn-main w-100"
              style={{
                backgroundColor: "#dc3545",
                backgroundImage: "none",
                border: "none"
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