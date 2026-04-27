import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";

function UserList() {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentAdminId, setCurrentAdminId] = useState(null);

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

  return (
    <div style={{ padding: "10px" }}>
      <h3 style={{ color: "var(--clr-azul3)", fontWeight: "bold", marginBottom: "20px" }}>
        Gestión de Usuarios
      </h3>

      <div className="table-responsive" style={{ 
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
            {users.map((u) => {
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
                          style={{ 
                            width: "42px", height: "42px", borderRadius: "50%", 
                            marginRight: "15px", objectFit: "cover",
                            border: "2px solid #fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                          }} 
                        />
                      ) : (
                        <div style={{ 
                          width: "42px", height: "42px", borderRadius: "50%", 
                          backgroundColor: "#f0f4f8", color: "#2f6fb0",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginRight: "15px", fontWeight: "bold", fontSize: "1rem"
                        }}>
                          {u.username?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span style={{ fontWeight: "600", color: "#2c3e50", fontSize: "0.95rem" }}>
                        {u.username} {isMe && <small className="text-muted">(Tú)</small>}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "15px 18px" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      color: isAdmin ? "#2f6fb0" : "#666", fontWeight: "700", fontSize: "0.85rem"
                    }}>
                      <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        backgroundColor: isAdmin ? "#2f6fb0" : "#ccc"
                      }}></div>
                      {isAdmin ? "ADMINISTRADOR" : "USUARIO"}
                    </div>
                  </td>
                  <td style={{ padding: "15px 18px", textAlign: "right" }}>
                    <button
                      className="btn-main me-2"
                      style={{ padding: "6px 16px", fontSize: "12px", borderRadius: "6px", fontWeight: "600" }}
                      onClick={() => nav(`/admin/usuarios/edit/${u.id}`)}
                    >
                      Editar
                    </button>

                    <button 
                      className="btn-main" 
                      style={{ 
                        padding: "6px 16px", fontSize: "12px", borderRadius: "6px", 
                        background: isMe ? "#ffa4a4" : "#d33", 
                        color: isMe ? "#999" : "white",
                        fontWeight: "600", cursor: isMe ? "not-allowed" : "pointer" 
                      }} 
                      onClick={() => borrar(u.id)}
                      disabled={isMe}
                    >
                      Borrar
                    </button>
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