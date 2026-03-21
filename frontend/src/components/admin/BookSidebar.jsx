function BookSidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h3>Panel Admin</h3>

      {/* Sección Libros */}
      <h5>Gestionar Libros</h5>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <a href="#" onClick={() => onSelect("libros-list")}>
            Ver Libros
          </a>
        </li>
        <li className="list-group-item">
          <a href="#" onClick={() => onSelect("libros-add")}>
            Agregar Libro
          </a>
        </li>
        <li className="list-group-item">
          <a href="#" onClick={() => onSelect("libros-edit")}>
            Editar Libro
          </a>
        </li>
        <li className="list-group-item">
          <a href="#" onClick={() => onSelect("libros-delete")}>
            Eliminar Libro
          </a>
        </li>
      </ul>

      {/* Sección Más Opciones */}
      <h5>Más Opciones</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <a href="#" onClick={() => onSelect("perfil")}>
            Editar Perfil
          </a>
        </li>
      </ul>
    </div>
  );
}

export default BookSidebar;
