import { useNavigate, Link } from "react-router-dom";

import AddUserForm from "./AddUserForm";
import { handleCreateUser } from "../../utils/userHandler.js";

import "../../styles/style_form.css";

function RegisterPage() {
  const nav = useNavigate();

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-card">
          <AddUserForm onSubmit={(u) => handleCreateUser(u, nav)} />

          <p style={{ marginTop: 15 }}>
            Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
