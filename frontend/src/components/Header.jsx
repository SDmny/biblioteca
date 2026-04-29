import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import Swal from "sweetalert2";

function Header() {
  const [showNotif, setShowNotif] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserData = async (userId) => {
    const { data } = await supabase
      .from("user")
      .select("username, role, image_url")
      .eq("id", userId)
      .single();

    if (data) {
      setUser({
        usuario: data.username,
        rol: data.role,
        img: data.image_url,
      });
    }
  };

  useEffect(() => {
    let channel; // referencia para limpiar

    const setupChannel = (userId) => {
      // si ya había un canal, lo quitamos
      if (channel) supabase.removeChannel(channel);

      channel = supabase
        .channel(`user-changes-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "user",
            filter: `id=eq.${userId}`,
          },
          (payload) => {
            setUser({
              usuario: payload.new.username,
              rol: payload.new.role,
              img: payload.new.image_url,
            });
          },
        )
        .subscribe();
    };

    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUserData(session.user.id);
        setupChannel(session.user.id);
      }
    });

    // Cambios de sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchUserData(session.user.id);
        setupChannel(session.user.id);
      } else {
        setUser(null);
        if (channel) supabase.removeChannel(channel);
      }
    });

    // limpieza al desmontar
    return () => {
      subscription.unsubscribe();
      if (channel) supabase.removeChannel(channel);
    };
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
      color: "#1a1a1a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await supabase.auth.signOut();
        window.location.href = "/";
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
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/conocenos">
                  Conócenos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
              {(!user || user.rol !== "administrador") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/libros">
                    Libros
                  </Link>
                </li>
              )}

              {user && user.rol === "administrador" && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                    onClick={() =>
                      localStorage.setItem("adminSelected", "user-list")
                    }
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
                  <Link to="/perfil" className="user-link">
                    <img
                      src={user.img || "/src/assets/images/user.png"}
                      className="user-img"
                      alt="avatar"
                      style={{ objectFit: "cover" }}
                    />
                    <span>{user.usuario}</span>
                  </Link>

                  <button
                    className="logout-icon ms-2"
                    onClick={cerrarSesion}
                    title="Cerrar sesión"
                  >
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