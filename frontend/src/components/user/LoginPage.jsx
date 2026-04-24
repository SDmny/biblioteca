import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../utils/supabase.js";
import Swal from "sweetalert2";
import "../../styles/style_form.css";

function LoginPage() {
  const nav = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!usuario || !password) {
      Swal.fire("Campos vacíos", "Debes llenar todos los campos", "warning");
      return;
    }

    // 1. Buscar el email asociado al username
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("id, username, role, email")
      .eq("username", usuario)
      .single();

    if (userError || !userData) {
      Swal.fire("Error", "Usuario no encontrado", "error");
      return;
    }

    // 2. Obtener el email desde auth.users usando el id
    const { error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    Swal.fire("Bienvenido", "Inicio de sesión exitoso", "success").then(() =>
      nav("/dashboard"),
    );
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
          <div style={{ marginTop: 15 }}>
            <p>
              No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </p>
            <Link to="/reset-password" style={{ fontSize: "0.9em" }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
