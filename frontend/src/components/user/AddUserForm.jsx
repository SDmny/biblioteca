import { useState } from "react";
import Swal from "sweetalert2";
import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";

function AddUsers({ user = null, onBack, onSubmit, isAdminContext = false }) {
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

    if (
      !form.nombre ||
      !form.apellido ||
      !form.usuario ||
      !form.email ||
      !form.password ||
      !form.confirm_password ||
      !form.fec_nac
    ) {
      Swal.fire(
        "Campos incompletos",
        "Debes llenar todos los campos",
        "warning",
      );
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Swal.fire("Error", "Correo electrónico inválido", "error");
      return;
    }
    if (form.password.length < 6) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 6 caracteres",
        "error",
      );
      return;
    }
    if (form.password !== form.confirm_password) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (user) {
      users = users.map((u) => (u.usuario === user.usuario ? { ...form } : u));
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    } else {
      if (users.some((u) => u.usuario === form.usuario)) {
        Swal.fire("Error", "Ese usuario ya existe", "error");
        return;
      }
      users.push({ ...form });
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire("Éxito", "Usuario creado correctamente", "success");
    }

    setTimeout(() => {
      onBack();
    }, 100);

    onSubmit(form);
  };

  return (
    <>
      <h2>{isAdminContext ? "Crear usuario" : "Registrarse"}</h2>
      <form onSubmit={submit}>
        <BasicInput label="Nombre">
          <TypeInput
            type="text"
            name="nombre"
            placeholder={"Nombres(s)"}
            value={form.nombre}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Apellido">
          <TypeInput
            type="text"
            name="apellido"
            placeholder={"Apellido(s)"}
            value={form.apellido}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Fecha de nacimiento">
          <TypeInput
            type="date"
            name="fec_nac"
            value={form.fec_nac}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Email">
          <TypeInput
            type="email"
            name="email"
            placeholder={"correo@ejemplo.com"}
            value={form.email}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Usuario">
          <TypeInput
            type="text"
            name="usuario"
            placeholder={"Usuario"}
            value={form.usuario}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Contraseña">
          <TypeInput
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Confirmar contraseña">
          <TypeInput
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={change}
            required
          />
        </BasicInput>

        {isAdminContext && (
          <BasicInput label="Rol">
            <select name="rol" value={form.rol} onChange={change} required>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </BasicInput>
        )}
        <input type="submit" value="Registrarse" className=" btn-custom" />
      </form>
    </>
  );
}

export default AddUsers;
