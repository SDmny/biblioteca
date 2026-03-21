import BasicCard from "../../components/ui/BasicCard";
import BasicButton from "../../components/ui/BasicButton";

function AdminDashboard() {
  return (
    <div className="main-container">
      <h2>Panel de Administración</h2>

      <div className="card-section">
        {/* Tarjeta Usuarios */}
        <BasicCard titulo="Gestionar Usuarios">
          <BasicButton to={"/admin/usuarios"} texto={"Administrar usuarios"} />
        </BasicCard>

        {/* Tarjeta Libros */}
        <BasicCard titulo="Gestionar Libros">
          <BasicButton to={"/admin/libros"} texto={"Administrar libros"} />
        </BasicCard>

        {/* Tarjeta Más Opciones */}
        <BasicCard titulo="Más Opciones">
          <BasicButton to={"/profile-edit"} texto={"Editar perfil"} />
        </BasicCard>
      </div>
    </div>
  );
}

export default AdminDashboard;
