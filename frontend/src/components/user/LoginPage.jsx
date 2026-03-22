import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/style_form.css";

function LoginPage() {
  const nav = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!usuario || !password) {
      Swal.fire("Campos vacíos", "Debes llenar todos los campos", "warning");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const encontrado = users.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (encontrado) {
      localStorage.setItem("user", JSON.stringify(encontrado));
      Swal.fire("Bienvenido", "Inicio de sesión exitoso", "success").then(() =>
        nav("/dashboard")
      );
    } else {
      Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Iniciar sesión</h2>
        <div className="form-card">
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-custom" onClick={login}>
            Iniciar sesión
          </button>
          <p style={{ marginTop: 15 }}>
            No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;