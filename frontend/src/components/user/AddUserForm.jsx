import { useState } from "react";
import { supabase } from "../../utils/supabase.js";
import Swal from "sweetalert2";
import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";

function AddUsers({ onSubmit, isAdminContext = false }) {
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

  const submit = async (e) => {
    e.preventDefault();

    // Normalizar con trim
    const nombreTrimmed = form.nombre ? form.nombre.trim() : "";
    const apellidoTrimmed = form.apellido ? form.apellido.trim() : "";
    const usuarioTrimmed = form.usuario ? form.usuario.trim() : "";
    const emailTrimmed = form.email ? form.email.trim() : "";
    const fecNac = form.fec_nac;

    // Validaciones
    if (
      !nombreTrimmed ||
      !apellidoTrimmed ||
      !usuarioTrimmed ||
      !emailTrimmed ||
      !form.password ||
      !form.confirm_password ||
      !fecNac
    ) {
      Swal.fire(
        "Campos incompletos",
        "Debes llenar todos los campos",
        "warning",
      );
      return;
    }

    const year = new Date(fecNac).getFullYear();
    if (year < 1900) {
      Swal.fire(
        "Error",
        "La fecha de nacimiento no puede ser anterior a 1900",
        "error",
      );
      return;
    }

    if (!/\S+@\S+\.\S+/.test(emailTrimmed)) {
      Swal.fire("Error", "Correo electrónico inválido", "error");
      return;
    }

    if (!/^[A-Za-z0-9_-]+$/.test(usuarioTrimmed)) {
      Swal.fire(
        "Error",
        "El nombre de usuario solo puede contener letras, números, guion (-) y guion bajo (_), sin espacios",
        "error",
      );
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

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.usuario === usuarioTrimmed)) {
      Swal.fire("Error", "Ese usuario ya existe", "error");
      return;
    }

    onSubmit({
      ...form,
      nombre: nombreTrimmed,
      apellido: apellidoTrimmed,
      usuario: usuarioTrimmed,
      email: emailTrimmed,
    });

    // 1. Crear usuario en auth.users
    const { data, error } = await supabase.auth.signUp({
      email: emailTrimmed,
      password: form.password,
    });
    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    // 2. Insertar perfil en tu tabla user
    const { error: insertError } = await supabase.from("user").insert([
      {
        id: data.user.id, // mismo UUID que auth.users
        name: nombreTrimmed,
        lastname: apellidoTrimmed,
        birth_date: form.fec_nac,
        username: usuarioTrimmed,
        role: form.rol,
      },
    ]);

    if (insertError) {
      Swal.fire("Error", insertError.message, "error");
    } else {
      Swal.fire("Éxito", "Usuario registrado correctamente", "success");
    }
  };

  return (
    <>
      <h2>{isAdminContext ? "Crear usuario" : "Registrarse"}</h2>
      <form onSubmit={submit}>
        <BasicInput label="Nombre">
          <TypeInput
            type="text"
            name="nombre"
            placeholder="Nombres(s)"
            value={form.nombre}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Apellido">
          <TypeInput
            type="text"
            name="apellido"
            placeholder="Apellido(s)"
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
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={change}
            required
          />
        </BasicInput>
        <BasicInput label="Usuario">
          <TypeInput
            type="text"
            name="usuario"
            placeholder="Usuario"
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
            <select
              name="rol"
              value={form.rol}
              onChange={change}
              className="form-control"
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </BasicInput>
        )}

        <input type="submit" value="Registrarse" className="btn-custom" />
      </form>
    </>
  );
}

export default AddUsers;
