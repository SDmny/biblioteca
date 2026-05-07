import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase.js";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import AddUserFormFields from "./AddUserFormFields.jsx";

function AddUsers({ onSuccess }) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

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
        if (value.trim().length < 2)
          error = "Debe contener al menos 2 caracteres";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Correo electrónico inválido";
        break;
      case "usuario":
        if (!/^[A-Za-z0-9_-]+$/.test(value))
          error =
            "El nombre de usuario solo puede contener letras, números, guion y guion bajo";
        break;
      case "fec_nac": {
        const fechaSeleccionada = new Date(value);
        const fechaActual = new Date();
        const year = fechaSeleccionada.getFullYear();
        if (!value) {
          error = "La fecha de nacimiento es obligatoria";
        } else if (year < 1900) {
          error = "El año no puede ser anterior a 1900";
        } else if (fechaSeleccionada > fechaActual) {
          error = "La fecha no puede ser futura";
        }
        break;
      }
      case "password":
        if (value.length < 6)
          error = "La contraseña debe contener al menos 6 caracteres";
        if (form.confirm_password && form.confirm_password !== value) {
          setErrors((prev) => ({
            ...prev,
            confirm_password: "Las contraseñas no coinciden",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirm_password: "" }));
        }
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
  };

  const onCaptchaChange = (value) => {
    setCaptchaValido(!!value);
  };

  const obtenerMensajesFaltantes = () => {
    let faltan = [];
    if (!form.nombre) faltan.push("Nombre");
    if (!form.apellido) faltan.push("Apellido");
    if (!form.email) faltan.push("Email");
    if (!form.usuario) faltan.push("Usuario");
    if (!form.fec_nac) faltan.push("Fecha");
    if (!form.password) faltan.push("Contraseña");
    if (!form.confirm_password) faltan.push("Confirmar contraseña");

    const erroresActivos = Object.entries(errors).filter(([msg]) => msg !== "");
    erroresActivos.forEach(([campo]) => {
      if (!faltan.includes(campo)) faltan.push(`Corregir ${campo}`);
    });

    if (!captchaValido) faltan.push("Confirmar Captcha");
    return faltan;
  };

  const faltantes = obtenerMensajesFaltantes();
  const formularioEsValido = faltantes.length === 0;

  const submit = async (e) => {
    e.preventDefault();
    if (!formularioEsValido) return;

    try {
      const { data: existingUser, error: checkError } = await supabase
        .from("user")
        .select("email, username")
        .or(`email.eq.${form.email.trim()},username.eq.${form.usuario.trim()}`)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUser) {
        if (
          existingUser.email.toLowerCase() === form.email.trim().toLowerCase()
        ) {
          Swal.fire({
            title: "Correo ya registrado",
            text: "Este correo electrónico ya está vinculado a una cuenta.",
            icon: "warning",
            confirmButtonColor: "#2f6fb0",
          });
        } else {
          Swal.fire({
            title: "Usuario no disponible",
            text: "El nombre de usuario ya está en uso. Por favor, elige otro.",
            icon: "warning",
            confirmButtonColor: "#2f6fb0",
          });
        }
        return;
      }
    } catch (err) {
      console.error("Error al validar datos:", err.message);
    }

    const { error } = await supabase.auth.signUp({
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

    if (error) {
      Swal.fire("Error", error.message, "error");
      return;
    }

    Swal.fire({
      title: "¡Registro Exitoso!",
      text: "Se ha enviado un enlace de confirmación a tu correo. Por favor, verifícalo.",
      icon: "success",
      confirmButtonText: "Entendido",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      nav("/");
      if (onSuccess) onSuccess();
    });
  };

  return (
    <>
      <h2>Registrarse</h2>
      <form onSubmit={submit}>
        <AddUserFormFields form={form} errors={errors} change={change} />

        <div style={{ marginTop: "15px", marginBottom: "15px" }}>
          <ReCAPTCHA sitekey={siteKey} onChange={onCaptchaChange} />
        </div>

        <div className="mt-3">
          {faltantes.length > 0 ? (
            <div
              className="alert alert-warning py-2"
              style={{ fontSize: "0.85rem" }}
            >
              <strong>Pendiente:</strong> {faltantes.join(", ")}
            </div>
          ) : (
            <div
              className="alert alert-success py-2"
              style={{ fontSize: "0.85rem" }}
            >
              ✓ Información lista para registrar
            </div>
          )}
        </div>

        <input
          type="submit"
          value="Registrarse"
          className="btn-custom"
          disabled={!formularioEsValido}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            opacity: formularioEsValido ? 1 : 0.5,
            cursor: formularioEsValido ? "pointer" : "not-allowed",
          }}
        />
      </form>
    </>
  );
}

export default AddUsers;
