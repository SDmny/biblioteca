import React, { useState } from "react";

import Home from "./interfaces/Home.jsx";
import Conocenos from "./interfaces/Conocenos.jsx";
import Contacto from "./interfaces/Contacto.jsx";
import Catalogo from "./interfaces/Catalogo.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [view, setView] = useState("home");
  return (
    <>
      <Header setView={setView} />

      <main className="container my-5">
        {view === "home" && <Home />}
        {view === "conocenos" && <Conocenos />}
        {view === "contacto" && <Contacto />}
        {view === "detalle" && <Catalogo />}
      </main>

      <Footer />
    </>
  );
}

export default App;
