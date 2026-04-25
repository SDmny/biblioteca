import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase.js";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";

function AddUsers({ onSuccess, isAdminContext = false }) {
  const nav = useNavigate();
  const [captchaValido, setCaptchaValido] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fec_nac: "",
    email: "",
    usuario: "",
    password: "",
    confirm_password: "",
    rol: "usuario",
  });

  const validarCampo = (name, value) => {
    let error = "";
    switch (name) {
      case "nombre":
      case "apellido":
        if (value.trim().length < 2) error = "Debe contener al menos 2 caracteres";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Correo electrónico inválido";
        break;
      case "usuario":
        if (!/^[A-Za-z0-9_-]+$/.test(value)) error = "El nombre de usuario solo puede contener letras, números, guion y guion bajo";
        break;
      case "fec_nac":
        const year = new Date(value).getFullYear();
        if (year < 1900) error = "El año no puede ser anterior a 1900";
        break;
      case "password":
        if (value.length < 6) error = "La contraseña debe contener al menos 6 caracteres";
        break;
      case "confirm_password":
        if (value !== form.password) error = "Las contraseñas no coinciden";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validarCampo(name, value);
    if (name === "password") {
      setErrors((prev) => ({ 
        ...prev, 
        confirm_password: value !== form.confirm_password ? "Las contraseñas no coinciden" : "" 
      }));
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaValido(!!value);
  };

  const formularioEsValido = () => {
    const hayCamposVacios = !form.nombre || !form.apellido || !form.email || !form.usuario || !form.password || !form.confirm_password || !form.fec_nac;
    const hayErrores = Object.values(errors).some(error => error !== "");
    return !hayCamposVacios && !hayErrores && captchaValido;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!formularioEsValido()) return;

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          name: form.nombre.trim(),
          lastname: form.apellido.trim(),
          birthdate: form.fec_nac,
          username: form.usuario.trim(),
          role: form.rol,
        },
      },
    });

    if (signUpError) {
      let mensajeError = signUpError.message;
      if (mensajeError === "User already registered") {
        mensajeError = "Este correo electrónico ya está registrado.";
      }
      Swal.fire("Error al registrar", mensajeError, "error");
      return;
    }

    try {
      await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: form.email.trim(),
          name: form.nombre.trim(),
        }),
      });
    } catch (e) {
      console.error("Error al enviar email", e);
    }

    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
      icon: "success",
      confirmButtonText: "Ir al Login",
      confirmButtonColor: "#3085d6"
    }).then(() => {
      nav("/login");
      if (onSuccess) onSuccess();
    });
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
          {errors.nombre && <small style={{ color: "red", display: "block" }}>{errors.nombre}</small>}
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
          {errors.apellido && <small style={{ color: "red", display: "block" }}>{errors.apellido}</small>}
        </BasicInput>

        <BasicInput label="Fecha de nacimiento">
          <TypeInput
            type="date"
            name="fec_nac"
            value={form.fec_nac}
            onChange={change}
            required
          />
          {errors.fec_nac && <small style={{ color: "red", display: "block" }}>{errors.fec_nac}</small>}
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
          {errors.email && <small style={{ color: "red", display: "block" }}>{errors.email}</small>}
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
          {errors.usuario && <small style={{ color: "red", display: "block" }}>{errors.usuario}</small>}
        </BasicInput>

        <BasicInput label="Contraseña">
          <TypeInput
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            required
          />
          {errors.password && <small style={{ color: "red", display: "block" }}>{errors.password}</small>}
        </BasicInput>

        <BasicInput label="Confirmar contraseña">
          <TypeInput
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={change}
            required
          />
          {errors.confirm_password && <small style={{ color: "red", display: "block" }}>{errors.confirm_password}</small>}
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
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </BasicInput>
        )}

        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <ReCAPTCHA
            sitekey="6LeD9cgsAAAAAEsdS_PkWKuwuLfhQn_d6H0OEGcv"
            onChange={onCaptchaChange}
          />
        </div>

        <input 
          type="submit" 
          value={isAdminContext ? "Crear Usuario" : "Registrarse"} 
          className="btn-custom" 
          disabled={!formularioEsValido()}
          style={{ 
            opacity: formularioEsValido() ? 1 : 0.5, 
            cursor: formularioEsValido() ? "pointer" : "not-allowed" 
          }}
        />
      </form>
    </>
  );
}

export default AddUsers;