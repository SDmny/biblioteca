import { useNavigate, Link } from "react-router-dom";

import AddUserForm from "./AddUserForm";
import BackButton from "../ui/BackButton.jsx";

import "../../styles/style_form.css";

function RegisterPage() {
  const nav = useNavigate();

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <BackButton />
        <br />
        <br />
        <div className="form-card">
          <AddUserForm onSuccess={() => nav("/login")} isAdminContext={false} />
          <p style={{ marginTop: 15 }}>
            Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
