function AdminSidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h3>Panel Admin</h3>
      {/* Sección Usuarios */}
      <h5>Gestionar Usuarios</h5>
      <button onClick={() => onSelect("usuarios-list")}>Ver Usuarios</button>
      <button onClick={() => onSelect("usuarios-add")}>Crear Usuario</button>
      <button onClick={() => onSelect("usuarios-edit")}>Editar Usuario</button>
      <button onClick={() => onSelect("usuarios-delete")}>
        Eliminar Usuario
      </button>
      <br />
      <br />
      {/* Sección Libros */}
      <h5>Gestionar Libros</h5>
      <button onClick={() => onSelect("libros-list")}>Ver Libros</button>
      <button onClick={() => onSelect("libros-add")}>Agregar Libro</button>
      <button onClick={() => onSelect("libros-edit")}>Editar Libro</button>
      <button onClick={() => onSelect("libros-delete")}>Eliminar Libro</button>
      <br />
      <br />
      {/* Sección Más Opciones */}
      <h5>Más Opciones</h5>
      <button onClick={() => onSelect("perfil")}>Editar Perfil</button>
    </div>
  );
}

export default AdminSidebar;
