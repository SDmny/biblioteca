function UserSidebar({ onSelect }) {
  return (
    <>
      <aside className="sidebar">
        <h3>Panel Admin</h3>

        {/* Sección Usuarios */}
        <h5>Gestionar Usuarios</h5>
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <a href="#" onClick={() => onSelect("usuarios-list")}>
              Ver Usuarios
            </a>
          </li>
          <li className="list-group-item">
            <a href="#" onClick={() => onSelect("usuarios-add")}>
              Crear Usuario
            </a>
          </li>
          <li className="list-group-item">
            <a href="#" onClick={() => onSelect("usuarios-edit")}>
              Editar Usuario
            </a>
          </li>
          <li className="list-group-item">
            <a href="#" onClick={() => onSelect("usuarios-delete")}>
              Eliminar Usuario
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
      </aside>
    </>
  );
}

export default UserSidebar;
