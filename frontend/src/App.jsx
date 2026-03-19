import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./interfaces/Home.jsx";
import Contacto from "./interfaces/Contacto.jsx";
import Catalogo from "./interfaces/Catalogo.jsx";
import Conocenos from "./interfaces/Conocenos.jsx";
import BookDetailPage from "./interfaces/BookDetailPage.jsx";

import ProfilePage from "./interfaces/user/ProfilePage.jsx";
import Dashboard from "./interfaces/user/Dashboard.jsx";

import LoginPage from "./components/user/LoginPage.jsx";
import RegisterPage from "./components/user/RegisterPage.jsx";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (

    <Router>
      <Header />
      <div id="contenido">
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/conocenos"
            element={<Conocenos />}
          />

          <Route
            path="/contacto"
            element={<Contacto />}
          />

          <Route
            path="/catalogo"
            element={<Catalogo />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="/perfil"
            element={<ProfilePage />}
          />

          <Route
            path="/libro/:id"
            element={<BookDetailPage />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;