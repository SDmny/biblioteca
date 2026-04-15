import { useState } from "react";
import Swal from "sweetalert2";
import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";

function AddUsers({ onSubmit, isAdminContext = false }) {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const isCurrentlyAdmin = currentUser.rol === "admin";

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fec_nac: "",
    email: "",
    usuario: "",
    password: "",
    confirm_password: "",
    rol: "user",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const nombreTrimmed = form.nombre ? form.nombre.trim() : "";
    const apellidoTrimmed = form.apellido ? form.apellido.trim() : "";
    const usuarioTrimmed = form.usuario ? form.usuario.trim() : "";
    const emailTrimmed = form.email ? form.email.trim() : "";
    const fecNac = form.fec_nac;

    if (!nombreTrimmed || !apellidoTrimmed || !usuarioTrimmed || !emailTrimmed || !form.password || !form.confirm_password || !fecNac) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
      return;
    }

    if (form.password !== form.confirm_password) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    onSubmit({
      ...form,
      nombre: nombreTrimmed,
      apellido: apellidoTrimmed,
      usuario: usuarioTrimmed,
      email: emailTrimmed,
    });
  };

  return (
    <>
      <form onSubmit={submit}>
        <BasicInput label="Nombre">
          <TypeInput type="text" name="nombre" placeholder="Nombres(s)" value={form.nombre} onChange={change} required />
        </BasicInput>
        
        <BasicInput label="Apellido">
          <TypeInput type="text" name="apellido" placeholder="Apellido(s)" value={form.apellido} onChange={change} required />
        </BasicInput>

        <BasicInput label="Fecha de nacimiento">
          <TypeInput type="date" name="fec_nac" value={form.fec_nac} onChange={change} required />
        </BasicInput>

        <BasicInput label="Email">
          <TypeInput type="email" name="email" placeholder="correo@ejemplo.com" value={form.email} onChange={change} required />
        </BasicInput>

        <BasicInput label="Usuario">
          <TypeInput type="text" name="usuario" placeholder="Usuario" value={form.usuario} onChange={change} required />
        </BasicInput>

        <BasicInput label="Contraseña">
          <TypeInput type="password" name="password" value={form.password} onChange={change} required />
        </BasicInput>

        <BasicInput label="Confirmar contraseña">
          <TypeInput type="password" name="confirm_password" value={form.confirm_password} onChange={change} required />
        </BasicInput>

        {isAdminContext && (
          <BasicInput label="Rol">
            <select name="rol" value={form.rol} onChange={change} className="form-control" required>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </BasicInput>
        )}

        {/* 2. El botón cambia su valor según si quien opera es Admin o no */}
        <input 
          type="submit" 
          value={isCurrentlyAdmin ? "Registrar" : "Registrarse"} 
          className="btn-custom" 
        />
      </form>
    </>
  );
}

export default AddUsers;