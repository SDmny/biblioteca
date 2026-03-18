import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
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
                <Link className="nav-link text-white" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/conocenos">
                  Conócenos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contacto">
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/catalogo">
                  Libros
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
