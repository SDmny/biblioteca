import { useNavigate } from "react-router-dom";

function UserList({ mode = "all" }) {
  const nav = useNavigate();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const borrar = (usuario) => {
    const ok = window.confirm("¿Eliminar usuario?");
    if (!ok) return;

    const updated = users.filter((u) => u.usuario !== usuario);

    localStorage.setItem("users", JSON.stringify(updated));

    window.location.reload();
  };

  return (
    <div>
      <h3>Usuarios</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.usuario}>
              <td>{u.usuario}</td>
              <td>{u.rol}</td>
              <td>
                {(mode === "all" || mode === "edit") && (
                  <button
                    className="btn-main me-2"
                    onClick={() => nav(`/admin/usuarios/edit/${u.usuario}`)}
                  >
                    Editar
                  </button>
                )}

                {(mode === "all" || mode === "delete") && (
                  <button className="btn-main" onClick={() => borrar(u.usuario)}>
                    Borrar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;