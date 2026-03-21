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
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
