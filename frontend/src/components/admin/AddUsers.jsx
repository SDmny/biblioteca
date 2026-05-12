import { useState, useEffect } from "react";
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
  const [touched, setTouched] = useState(false); 
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

  useEffect(() => {
    const verificarDisponibilidad = async () => {
      if (form.email && /\S+@\S+\.\S+/.test(form.email)) {
        const { data } = await supabase.from("user").select("email").eq("email", form.email.trim()).maybeSingle();
        if (data) {
          setErrors(prev => ({ ...prev, email: "Este correo ya está registrado" }));
        } else {
          setErrors(prev => ({ ...prev, email: "Email disponible ✓" }));
        }
      }

      if (form.usuario && /^[A-Za-z0-9_-]+$/.test(form.usuario)) {
        const { data } = await supabase.from("user").select("username").eq("username", form.usuario.trim()).maybeSingle();
        if (data) {
          setErrors(prev => ({ ...prev, usuario: "El usuario ya está en uso" }));
        } else {
          setErrors(prev => ({ ...prev, usuario: "Usuario disponible ✓" }));
        }
      }
    };

    const timeoutId = setTimeout(verificarDisponibilidad, 500);
    return () => clearTimeout(timeoutId);
  }, [form.email, form.usuario]);

  const validarCampo = (name, value) => {
    let error = "";
    switch (name) {
      case "nombre":
      case "apellido":
        if (value.trim().length < 2)
          error = "Mínimo 2 caracteres";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Correo inválido";
        break;
      case "usuario":
        if (!/^[A-Za-z0-9_-]+$/.test(value))
          error = "Formato de usuario inválido";
        break;
      case "fec_nac": {
        const fechaSeleccionada = new Date(value);
        const fechaActual = new Date();
        const year = fechaSeleccionada.getFullYear();
        if (!value) {
          error = "Fecha obligatoria";
        } else if (year < 1900) {
          error = "Año inválido";
        } else if (fechaSeleccionada > fechaActual) {
          error = "Fecha futura";
        }
        break;
      }
      case "password":
        if (value.length < 6)
          error = "Contraseña corta (mín. 6)";
        if (form.confirm_password && form.confirm_password !== value) {
          setErrors((prev) => ({
            ...prev,
            confirm_password: "No coinciden",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirm_password: "" }));
        }
        break;
      case "confirm_password":
        if (value !== form.password) error = "No coinciden";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setTouched(true); 
    validarCampo(name, value);
  };

  const onCaptchaChange = (value) => {
    setCaptchaValido(!!value);
    if (value) setTouched(true);
  };

  const obtenerMensajesFaltantes = () => {
    let faltan = [];
    if (!form.nombre.trim()) faltan.push("Nombre");
    if (!form.apellido.trim()) faltan.push("Apellido");
    if (!form.email.trim()) faltan.push("Email");
    if (!form.usuario.trim()) faltan.push("Usuario");
    if (!form.fec_nac) faltan.push("Fecha");
    if (!form.password) faltan.push("Contraseña");
    if (form.password !== form.confirm_password) faltan.push("Validar contraseña");

    const erroresActivos = Object.entries(errors).filter(([key, msg]) => msg !== "" && !msg.includes("✓"));
    erroresActivos.forEach(([campo, msg]) => {
      if (!faltan.includes(msg)) faltan.push(msg);
    });

    if (!captchaValido) faltan.push("Captcha");
    return faltan;
  };

  const faltantes = obtenerMensajesFaltantes();
  const formularioEsValido = faltantes.length === 0;

  const submit = async (e) => {
    e.preventDefault();
    if (!formularioEsValido) return;

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
      text: "Verifica tu correo para confirmar la cuenta.",
      icon: "success",
      confirmButtonText: "Entendido",
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

        {touched && (
          <div className="mt-3">
            {faltantes.length > 0 ? (
              <div className="alert alert-warning py-2" style={{ fontSize: "0.85rem" }}>
                <strong>Pendiente:</strong> {faltantes.join(", ")}
              </div>
            ) : (
              <div className="alert alert-success py-2" style={{ fontSize: "0.85rem" }}>
                ✓ Información lista para registrar
              </div>
            )}
          </div>
        )}

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