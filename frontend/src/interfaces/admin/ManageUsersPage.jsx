import { useState } from "react";
import BasicCard from "../../components/ui/BasicCard";
import BasicButton from "../../components/ui/BasicButton";
import UserSidebar from "../../components/admin/UserSidebar";
import UserList from "../../components/user/UserList";

function ManageUsersPage() {
  const [selected, setSelected] = useState(null);

  const renderContent = () => {
    switch (selected) {
      case "usuarios-list":
        return <UserList></UserList>;
      case "usuarios-add":
        return <p>Aquí iría el formulario para crear usuario</p>;
      case "usuarios-edit":
        return <p>Aquí iría el formulario para editar usuario</p>;
      case "usuarios-delete":
        return <p>Aquí iría la opción para eliminar usuario</p>;
      case "perfil":
        return <p>Aquí iría la edición de perfil</p>;
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  return (
    <div className="main-container catalog-container">
      w{/* Sidebar */}
      <UserSidebar onSelect={setSelected} />
      {/* Contenido principal */}
      <div className="catalog-content">
        <h2>Administrar usuarios</h2>
        <BasicCard titulo="Contenido">{renderContent()}</BasicCard>
      </div>
    </div>
  );
}

export default ManageUsersPage;
