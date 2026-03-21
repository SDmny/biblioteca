import { useState } from "react";

import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import AddUsers from "../../components/admin/AddUsers.jsx";

import UserList from "../../components/user/UserList.jsx";
import EditProfile from "../../components/user/EditProfile.jsx";

import BookList from "../../components/book/BookList.jsx";

import AddBook from "../user/AddBook.jsx";

function AdminDashboard() {
  const [selected, setSelected] = useState(null);

  const renderContent = () => {
    switch (selected) {
      case "user-list":
        return <UserList />;
      case "user-add":
        return <AddUsers />;
      case "user-edit":
        return (
          <p>editar usuario, ManageUsersPage es una base, no es funcional</p>
        );
      case "user-delete":
        return <p>Aquí iría la opción para eliminar usuario</p>;
      case "book-list":
        return <BookList />;
      case "book-add":
        return <AddBook noMove={true} />;
      case "book-edit":
        return <p>Aquí iría el formulario para editar libro</p>;
      case "book-delete":
        return <p>Aquí iría la opción para eliminar libro</p>;
      case "profile":
        return <EditProfile noExtras={true} />;
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  return (
    <div className="catalog-container">
      {/* Sidebar */}
      <AdminSidebar onSelect={setSelected} />

      {/* Contenido principal */}
      <div className="catalog-content">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
