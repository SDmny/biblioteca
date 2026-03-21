import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import UserList from "../../components/user/UserList.jsx";

import BasicCard from "../../components/ui/BasicCard.jsx";
import EditProfile from "../../components/user/EditProfile.jsx";

function AdminDashboard() {
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const renderContent = () => {
    switch (selected) {
      case "usuarios-list":
        return <UserList />;
      case "usuarios-add":
        return <p>Aquí iría el formulario para crear usuario</p>;
      case "usuarios-edit":
        return <p>Aquí iría el formulario para editar usuario</p>;
      case "usuarios-delete":
        return <p>Aquí iría la opción para eliminar usuario</p>;
      case "perfil":
        return <EditProfile user={user} />; // aquí ya no va dentro de BasicCard
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

        {selected === "perfil" ? (
          // Renderiza EditProfile directamente
          renderContent()
        ) : (
          // Para todo lo demás, usa BasicCard
          <BasicCard titulo="Contenido">{renderContent()}</BasicCard>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
