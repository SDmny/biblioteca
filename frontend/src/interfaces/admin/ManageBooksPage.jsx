import { useState } from "react";
import BasicCard from "../../components/ui/BasicCard";
import BasicButton from "../../components/ui/BasicButton";
import BookSidebar from "../../components/admin/BookSidebar";

function ManageBookPage() {
  const [selected, setSelected] = useState(null);

  const renderContent = () => {
    switch (selected) {
      case "libros-list":
        return <p>Aquí se mostraría la lista de libros</p>;
      case "libros-add":
        return <p>Aquí iría el formulario para crear libro</p>;
      case "libros-edit":
        return <p>Aquí iría el formulario para editar libro</p>;
      case "libros-delete":
        return <p>Aquí iría la opción para eliminar libro</p>;
      case "perfil":
        return <p>Aquí iría la edición de perfil</p>;
      default:
        return <p>Selecciona una opción del menú</p>;
    }
  };

  return (
    <div className="main-container catalog-container">
      {/* Sidebar */}
      <BookSidebar onSelect={setSelected} />

      {/* Contenido principal */}
      <div className="catalog-content">
        <h2>Administrar libros</h2>
        <BasicCard titulo="Contenido">{renderContent()}</BasicCard>
      </div>
    </div>
  );
}

export default ManageBookPage;
