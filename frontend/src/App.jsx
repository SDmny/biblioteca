import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./interfaces/Home.jsx";
import Contacto from "./interfaces/Contacto.jsx";
import Catalogo from "./interfaces/Catalogo.jsx";
import Conocenos from "./interfaces/Conocenos.jsx";
import Dashboard from "./interfaces/user/Dashboard.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
