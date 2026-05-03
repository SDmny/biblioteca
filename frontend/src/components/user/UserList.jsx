import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";

function UserList() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        setCurrentAdminId(sessionData.session.user.id);
      }
      const { data, error } = await supabase
        .from("user")
        .select("id, username, role, image_url"); 
      
      if (error) {
        console.error("Error al cargar usuarios:", error.message);
      } else {
        setUsers(data);
      }
    };
    fetchInitialData();
  }, []);

  const borrar = async (id) => {
    if (id === currentAdminId) {
      Swal.fire({
        title: "Acción no permitida",
        text: "No puedes eliminar tu propia cuenta de administrador.",
        icon: "error",
        confirmButtonColor: "#2f6fb0"
      });
      return;
    }
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#ccc",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/admin/delete-user/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Error en el servidor");
        setUsers((prev) => prev.filter((u) => u.id !== id));
        Swal.fire("Eliminado", "El usuario ha sido borrado exitosamente.", "success");
      } catch (err) {
        Swal.fire("Error", "No se pudo borrar: " + err.message, "error");
      }
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.username?.toLowerCase().includes(searchTerm.toLowerCase());
    const userRole = u.role?.toLowerCase().trim() || "";
    const isAdmin = userRole === 'admin' || userRole === 'administrador';
    const matchesRole = 
      roleFilter === "all" || 
      (roleFilter === "administrador" && isAdmin) || 
      (roleFilter === "usuario" && !isAdmin);
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <h3 style={{ color: "var(--clr-azul3)", fontWeight: "bold", marginBottom: "20px" }}>
        Gestión de Usuarios
      </h3>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-end",
        gap: "15px", 
        marginBottom: "20px", 
        width: "100%", 
        flexWrap: "wrap" 
      }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "250px" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#888", textTransform: "uppercase" }}>Buscar Usuario</label>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              type="text"
              placeholder="Nombre de usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                flex: 1,
                padding: "8px 12px", borderRadius: "8px", border: "1px solid #e0e0e0", 
                outline: "none", fontSize: "14px"
              }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                style={{ border: "none", background: "#f0f0f0", borderRadius: "8px", padding: "0 12px", cursor: "pointer", color: "#666", fontSize: "12px" }}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px", minWidth: "220px" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "#888", textTransform: "uppercase" }}>Tipo de acceso</label>
          <div style={{ display: "flex", gap: "5px" }}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ 
                flex: 1,
                padding: "8px 12px", borderRadius: "8px", border: "1px solid #e0e0e0", 
                outline: "none", fontSize: "14px", backgroundColor: "white", cursor: "pointer"
              }}
            >
              <option value="all">Todos</option>
              <option value="usuario">Usuarios</option>
              <option value="administrador">Administradores</option>
            </select>
            {roleFilter !== "all" && (
              <button 
                onClick={() => setRoleFilter("all")}
                style={{ border: "none", background: "#f0f0f0", borderRadius: "8px", padding: "0 12px", cursor: "pointer", color: "#666", fontSize: "12px" }}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="table-responsive" style={{ 
        width: "100%",
        backgroundColor: "white", 
        borderRadius: "15px", 
        boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
        border: "1px solid #f0f0f0",
        overflow: "hidden"
      }}>
        <table className="table table-hover mb-0" style={{ verticalAlign: "middle" }}>
          <thead style={{ backgroundColor: "#fbfbfb" }}>
            <tr>
              <th style={{ padding: "18px", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.2px", fontWeight: "700" }}>Perfil</th>
              <th style={{ padding: "18px", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.2px", fontWeight: "700" }}>Tipo de acceso</th>
              <th style={{ padding: "18px", textAlign: "right", color: "#888", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1.2px", fontWeight: "700" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const userRole = u.role?.toLowerCase().trim();
              const isAdmin = userRole === 'admin' || userRole === 'administrador';
              const isMe = u.id === currentAdminId;
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid #fafafa" }}>
                  <td style={{ padding: "15px 18px" }}>
                    <div className="d-flex align-items-center">
                      {u.image_url ? (
                        <img 
                          src={u.image_url} 
                          alt={u.username}
                          style={{ width: "42px", height: "42px", borderRadius: "50%", marginRight: "15px", objectFit: "cover", border: "2px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} 
                        />
                      ) : (
                        <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "#f0f4f8", color: "#2f6fb0", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px", fontWeight: "bold" }}>
                          {u.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span style={{ fontWeight: "600", color: "#2c3e50" }}>
                        {u.username} {isMe && <small className="text-muted">(Tú)</small>}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: isAdmin ? "#2f6fb0" : "#666", fontWeight: "700", fontSize: "0.85rem" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: isAdmin ? "#2f6fb0" : "#ccc" }}></div>
                      {isAdmin ? "ADMINISTRADOR" : "USUARIO"}
                    </div>
                  </td>
                  <td style={{ textAlign: "right", paddingRight: "18px" }}>
                    <button className="btn-main me-2" style={{ padding: "6px 16px", fontSize: "12px", borderRadius: "6px", fontWeight: "600" }} onClick={() => nav(`/admin/usuarios/edit/${u.id}`)}>Editar</button>
                    <button className="btn-main" style={{ padding: "6px 16px", fontSize: "12px", borderRadius: "6px", background: isMe ? "#ffa4a4" : "#d33", color: "white", fontWeight: "600", cursor: isMe ? "not-allowed" : "pointer" }} onClick={() => borrar(u.id)} disabled={isMe}>Borrar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;