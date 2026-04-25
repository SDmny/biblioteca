import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Swal from "sweetalert2";

function Header() {
  const nav = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Función para obtener datos de la tabla 'user' de Supabase
    const fetchUserData = async (userId) => {
      const { data } = await supabase
        .from("user")
        .select("username, role") 
        .eq("id", userId)
        .single();
      
      if (data) {
        setUser({
          usuario: data.username,
          rol: data.role,
          img: null
        });
      }
    };

    // Revisar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchUserData(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchUserData(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      text: "Tendrás que ingresar de nuevo a tu cuenta.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00468b", 
      cancelButtonColor: "#d4d0c4",  
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
      background: "#f5f3ee",   
      color: "#1a1a1a"               
    }).then(async (result) => {
      if (result.isConfirmed) {
        await supabase.auth.signOut();
        nav("/");
      }
    });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-main navbar-custom">
        <div className="container">
          <Link className="navbar-brand text-main fw-bold" to="/">
            Biblioteca
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/conocenos">Conócenos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/libros">Libros</Link></li>

              {user && user.rol === "admin" && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin"
                    onClick={() => localStorage.setItem("adminSelected", "user-list")}
                  >
                    Administrar
                  </Link>
                </li>
              )}
            </ul>

            <div className="ms-3 d-flex align-items-center">
              {!user ? (
                <Link to="/login" className="btn btn-main">
                  Iniciar sesión
                </Link>
              ) : (
                <div className="user-box position-relative">
                  <button 
                    className="notif-bell-btn me-3" 
                    onClick={() => setShowNotif(!showNotif)}
                    title="Configurar Notificaciones"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </button>

                  {showNotif && (
                    <div className="notif-dropdown">
                      <h6>Preferencias de Correo</h6>
                      <div className="notif-item">
                        <span>Nuevos PDF</span>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="notif-item">
                        <span>Sugerencias</span>
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="notif-item">
                        <span>Actualizaciones</span>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="notif-item">
                        <span>Cuenta</span>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                  )}

                  <Link to="/perfil" className="user-link">
                    <img
                      src={user.img || "/src/assets/images/user.png"}
                      className="user-img"
                      alt="avatar"
                    />
                    <span>{user.usuario}</span>
                  </Link>

                  <button className="logout-icon ms-2" onClick={cerrarSesion} title="Cerrar sesión">
                    Salir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;