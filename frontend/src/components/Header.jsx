import { Link, useNavigate } from "react-router-dom";

function Header() {
  const nav = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const cerrarSesion = () => {
    const ok =
      confirm(
        "¿Deseas cerrar sesión?"
      );

    if (!ok) return;

    localStorage.removeItem("user");

    nav("/");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-main navbar-custom">

        <div className="container">

          <Link
            className="navbar-brand text-main fw-bold"
            to="/"
          >
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

          <div
            className="collapse navbar-collapse"
            id="menu"
          >

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

              <li className="nav-item">
                <Link className="nav-link" to="/libros">
                  Libros
                </Link>
              </li>

            </ul>

            <div className="ms-3">

              {!user && (

                <Link
                  to="/login"
                  className="btn btn-main"
                >
                  Iniciar sesión
                </Link>

              )}

              {user && (

                <div className="user-box">

                  <Link
                    to="/perfil"
                    className="user-link"
                  >

                    <img
                      src={
                        user.img ||
                        "/src/assets/images/user.png"
                      }
                      className="user-img"
                    />

                    <span>
                      {user.usuario}
                    </span>

                  </Link>

                  <button
                    className="logout-icon"
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