function AdminSidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h3>Panel Admin</h3>

      <h5>Gestionar Usuarios</h5>

      <button onClick={() => onSelect("user-list")}>
        Ver Usuarios
      </button>

      <button onClick={() => onSelect("user-add")}>
        Crear Usuario
      </button>

      <br />
      <br />

      <h5>Gestionar Libros</h5>

      <button onClick={() => onSelect("book-list")}>
        Ver Libros
      </button>

      <button onClick={() => onSelect("book-add")}>
        Agregar Libro
      </button>

      <br />
      <br />

      <h5>Más Opciones</h5>

      <button onClick={() => onSelect("profile")}>
        Editar perfil
      </button>
      
    </div>
  );
}

export default AdminSidebar;