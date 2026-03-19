import { useNavigate, Link } from "react-router-dom";

import AddUserForm from "./AddUserForm";

import "../../styles/style_form.css";

function RegisterPage() {

  const nav = useNavigate();


  const guardarUsuario = (user) => {

  const users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];


  users.push(user);


  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );


  // iniciar sesión automáticamente

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );


  alert("Usuario creado");

  nav("/catalogo");

};

  return (

    <div className="form-container">

      <div className="form-wrapper">

        <div className="form-card">

          <AddUserForm
            onSubmit={guardarUsuario}
          />


          <p style={{ marginTop: 15 }}>

            Ya tienes una cuenta?{" "}

            <Link to="/login">
              Iniciar sesión
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default RegisterPage;