import { useState } from "react";

function UserList({ onEdit, onDelete }) {
  // Inicializa directamente desde localStorage
  const [users] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const [filter, setFilter] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.nombre.toLowerCase().includes(filter.toLowerCase()) ||
      u.apellido.toLowerCase().includes(filter.toLowerCase()) ||
      u.usuario.toLowerCase().includes(filter.toLowerCase()) ||
      u.rol.toLowerCase().includes(filter.toLowerCase()),
  );

  if (users.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <div>
      {/* Barra de filtros */}
      <nav className="navbar bg-main mb-3 p-2">
        <input
          type="text"
          placeholder="Filtrar usuarios..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid var(--clr-azul2)",
          }}
        />
      </nav>

      {/* Tabla de usuarios */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, index) => (
            <tr key={index}>
              <td>
                {u.nombre} {u.apellido}
              </td>
              <td>{u.usuario}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn-main me-2" onClick={() => onEdit(u)}>
                  Editar
                </button>
                <button className="btn-main" onClick={() => onDelete(u)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
