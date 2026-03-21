import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./interfaces/Home.jsx";
import Contacto from "./interfaces/Contacto.jsx";
import Conocenos from "./interfaces/Conocenos.jsx";

import Catalogo from "./interfaces/book/Catalogo.jsx";
import BookDetailPage from "./interfaces/book/BookDetailPage.jsx";

import ProfilePage from "./interfaces/user/ProfilePage.jsx";
import ProfileView from "./interfaces/user/ProfileView.jsx";
import Dashboard from "./interfaces/user/Dashboard.jsx";

import LoginPage from "./components/user/LoginPage.jsx";
import RegisterPage from "./components/user/RegisterPage.jsx";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  useEffect(() => {
    const defaultAdmin = {
      nombre: "root",
      apellido: "root",
      usuario: "root",
      password: "root",
      rol: "admin",
      email: "admin@biblioteca.com",
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.usuario === "root");

    if (!exists) {
      users.push(defaultAdmin);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <Router>
      <Header />

      <div id="contenido">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/conocenos" element={<Conocenos />} />

          <Route path="/contacto" element={<Contacto />} />

          <Route path="/libros" element={<Catalogo />} />

          <Route path="/libro/:id" element={<BookDetailPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route path="/perfil" element={<ProfileView />} />

          <Route path="/profile-edit" element={<ProfilePage />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <AppRoutes />
      </div>

      <Footer />
    </Router>
  );
}

export default App;
