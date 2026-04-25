import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { supabase } from "../../utils/supabase";

function UserList() {
  const nav = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("user")
        .select("id, username, role");
      if (error) {
        console.error("Error al cargar usuarios:", error.message);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const borrar = async (id) => {
    const ok = window.confirm("¿Eliminar usuario?");
    if (!ok) return;

    const { error } = await supabase.from("user").delete().eq("id", id);
    if (error) {
      console.error("Error al borrar usuario:", error.message);
    } else {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
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
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn-main me-2"
                  onClick={() => nav(`/admin/usuarios/edit/${u.id}`)}
                >
                  Editar
                </button>

                <button className="btn-main" onClick={() => borrar(u.id)}>
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
