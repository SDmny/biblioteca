function Header() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-purple">
          <div className="container">
            <a className="navbar-brand text-pink fw-bold" href="../index.html">
              Biblioteca
            </a>
            <button
              className="navbar-toggler bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-center"
              id="menu"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link text-white" href="../index.html">
                    Inicio
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="../conocenos.htm">
                    Conócenos
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="../contacto.htm">
                    Contacto
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="../users/add_user.htm"
                  >
                    Registrarse
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
