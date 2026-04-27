import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase.js";
import Swal from "sweetalert2";
import AddUserFormFields from "./AddUserFormFields.jsx";
import BackButton from "../ui/BackButton.jsx";

function EditUserForm() {
  const { id } = useParams();
  const nav = useNavigate();
  
  const [loading, setLoading] = useState(true);
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

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "nombre":
      case "apellido":
        if (value.trim().length < 2) errorMsg = "Mínimo 2 caracteres.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errorMsg = "Correo electrónico no válido.";
        break;
      case "usuario":
        if (value.trim().length < 4) errorMsg = "El usuario debe tener al menos 4 caracteres.";
        break;
      case "fec_nac": {
        if (!value) {
          errorMsg = "La fecha es obligatoria.";
        } else {
          const fechaSeleccionada = new Date(value);
          const hoy = new Date();
          const anio = fechaSeleccionada.getFullYear();
          if (anio < 1900) {
            errorMsg = "El año no puede ser anterior a 1900.";
          } else if (fechaSeleccionada > hoy) {
            errorMsg = "La fecha no puede ser futura.";
          }
        }
        break;
      }
      case "password":
        if (value.length > 0 && value.length < 6) {
          errorMsg = "La contraseña debe tener al menos 6 caracteres.";
        }
        break;
      case "confirm_password":
        if (value !== form.password) errorMsg = "Las contraseñas no coinciden.";
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        Swal.fire("Error", "No se encontró el usuario", "error");
        nav("/admin"); 
      } else {
        setForm({
          nombre: data.name || "",
          apellido: data.lastname || "",
          fec_nac: data.birthdate || "",
          email: data.email || "",
          usuario: data.username || "",
          rol: data.role || "usuario", 
          password: "", 
          confirm_password: "",
        });
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, nav]);

  const change = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
    
    if (name === "password") {
      validateField("confirm_password", form.confirm_password);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const tieneErrores = Object.values(errors).some(msg => msg !== "");
    if (tieneErrores) {
      Swal.fire("Error", "Por favor, corrige los errores antes de guardar.", "error");
      return;
    }

    const { data, error: dbError } = await supabase
      .from("user")
      .update({
        name: form.nombre.trim(),
        lastname: form.apellido.trim(),
        birthdate: form.fec_nac,
        username: form.usuario.trim(),
        role: form.rol, 
        email: form.email.trim()
      })
      .eq("id", id)
      .select();

    if (dbError) {
      Swal.fire("Error", "No se pudo actualizar la tabla: " + dbError.message, "error");
      return;
    }

    if (form.password.trim() !== "") {
      try {
        const res = await fetch("http://localhost:3001/api/admin/update-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id, newPassword: form.password }),
        });

        if (!res.ok) throw new Error("Error en servidor de contraseñas");
      } catch (err) {
        Swal.fire("Aviso", "Datos básicos guardados, pero la contraseña no cambió.", "warning");
        return;
      }
    }

    Swal.fire("¡Éxito!", "Usuario actualizado correctamente", "success")
      .then(() => nav("/admin"));
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="d-flex align-items-center mb-4">
          <BackButton />
          <h2 className="ms-3 mb-0" style={{ color: "var(--clr-azul3)", fontWeight: "bold" }}>
            Editar Usuario
          </h2>
        </div>
        <div className="form-card p-4">
          <form onSubmit={submit}>
            <AddUserFormFields 
              form={form} 
              errors={errors} 
              change={change} 
              includeRole={true} 
            />
            
            <p className="text-muted mt-2" style={{fontSize: '0.8rem'}}>
              * Por motivos de privacidad no se puede visualizar la contraseña. Deje la contraseña en blanco si no desea cambiarla.
            </p>
            <br />
            <input 
              type="submit" 
              value="Guardar Cambios" 
              className="btn-custom" 
              style={{ 
                width: "100%",
                opacity: Object.values(errors).some(msg => msg !== "") ? 0.5 : 1,
                cursor: Object.values(errors).some(msg => msg !== "") ? "not-allowed" : "pointer"
              }} 
              disabled={Object.values(errors).some(msg => msg !== "")} 
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUserForm;