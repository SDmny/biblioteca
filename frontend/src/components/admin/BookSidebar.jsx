function AdminSidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h3>Panel Admin</h3>

      {/* Sección Usuarios */}
      <h5>Gestionar Usuarios</h5>

      <button onClick={() => onSelect("user-list")}>
        Ver Usuarios
      </button>

      <button onClick={() => onSelect("user-add")}>
        Crear Usuario
      </button>

      <button onClick={() => onSelect("user-edit")}>
        Editar Usuario
      </button>

      <br />
      <br />

      {/* Sección Libros */}
      <h5>Gestionar Libros</h5>

      <button onClick={() => onSelect("book-list")}>
        Ver Libros
      </button>

      <button onClick={() => onSelect("book-add")}>
        Agregar Libro
      </button>

      <button onClick={() => onSelect("book-edit")}>
        Editar Libro
      </button>

      <button onClick={() => onSelect("book-delete")}>
        Eliminar Libro
      </button>

      <br />
      <br />

      {/* Perfil */}
      <h5>Más Opciones</h5>

      <button onClick={() => onSelect("profile")}>
        Editar Perfil
      </button>
    </div>
  );
}

export default AdminSidebar;