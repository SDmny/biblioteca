import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import UserList from "../../components/user/UserList.jsx";

import BasicButton from "../../components/ui/BasicButton.jsx";
import BasicCard from "../../components/ui/BasicCard.jsx";

function AdminDashboard() {
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
    <div className="catalog-container">
      {/* Sidebar */}
      <AdminSidebar onSelect={setSelected} />
      {/* Contenido principal */}
      <div className="catalog-content">
        <h2>Administrar usuarios</h2>
        <div className="">
          <BasicCard titulo="Contenido">{renderContent()}</BasicCard>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
