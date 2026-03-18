import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./interfaces/Home.jsx";
import Conocenos from "./interfaces/Conocenos.jsx";
import Contacto from "./interfaces/Contacto.jsx";
import Catalogo from "./interfaces/Catalogo.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <Router>
      <Header />
      <div id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conocenos" element={<Conocenos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
