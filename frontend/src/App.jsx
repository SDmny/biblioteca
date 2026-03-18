import React, { useState } from "react";

import Home from "./interfaces/Home.jsx";
import Conocenos from "./interfaces/Conocenos.jsx";
import Contacto from "./interfaces/Contacto.jsx";
import Catalogo from "./interfaces/Catalogo.jsx";

function App() {
  const [view, setView] = useState("home");
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand fw-bold" href="#">
              Biblioteca
            </a>
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
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => setView("home")}
                  >
                    Inicio
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => setView("conocenos")}
                  >
                    Conócenos
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => setView("contacto")}
                  >
                    Contacto
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={() => setView("detalle")}
                  >
                    Detalle Libro
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container my-5">
        {view === "home" && <Home />}
        {view === "conocenos" && <Conocenos />}
        {view === "contacto" && <Contacto />}
        {view === "detalle" && <Catalogo />}
      </main>
    </>
  );
}

export default App;
