import { useState } from "react";
import Swal from "sweetalert2";

import BasicCard from "../ui/BasicCard.jsx";
import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";
import AddUserFormFields from "../user/AddUserFormFields.jsx";

function AddUsers({ onSuccess }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fec_nac: "",
    email: "",
    usuario: "",
    password: "",
    confirm_password: "",
    rol: "",
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

  const obtenerMensajesValidacion = () => {
    let pendientes = [];
    
    if (!form.nombre) pendientes.push("Nombre");
    if (!form.apellido) pendientes.push("Apellido");
    if (!form.email) pendientes.push("Email");
    if (!form.usuario) pendientes.push("Usuario");
    if (!form.fec_nac) pendientes.push("Fecha");
    if (!form.password) pendientes.push("Contraseña");
    if (!form.confirm_password) pendientes.push("Confirmación");
    if (!form.rol) pendientes.push("Rol");

    const erroresActivos = Object.entries(errors).filter(([_, msg]) => msg !== "");
    erroresActivos.forEach(([campo]) => {
      if (!pendientes.includes(campo)) pendientes.push(`Error en ${campo}`);
    });

    return pendientes;
  };

  const listaPendiente = obtenerMensajesValidacion();
  const formularioEsValido = listaPendiente.length === 0;

  const submit = async (e) => {
    e.preventDefault();

    if (!formularioEsValido) return;

    const response = await fetch(
      "http://localhost:3001/api/admin-create-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          name: form.nombre.trim(),
          lastname: form.apellido.trim(),
          birthdate: form.fec_nac,
          username: form.usuario.trim(),
          role: form.rol,
        }),
      },
    );
    const result = await response.json();
    if (result.error) {
      Swal.fire("Error", result.error, "error");
      return;
    }

    Swal.fire({
      title: "¡Usuario registrado!",
      text: "Puedes visualizar el nuevo usuario en Ver Usuarios.",
      icon: "success"
    });

    if (onSuccess) onSuccess();
  };

  return (
    <>
      <BasicCard titulo={"Agregar Usuario"}>
        <form onSubmit={submit}>
          <AddUserFormFields
            form={form}
            errors={errors}
            change={change}
            includeRole={true}
          />

          <div className="mt-4">
            {listaPendiente.length > 0 ? (
              <div className="alert alert-warning py-2" style={{ fontSize: '0.85rem' }}>
                <strong>Falta completar:</strong> {listaPendiente.join(", ")}
              </div>
            ) : (
              <div className="alert alert-success py-2" style={{ fontSize: '0.85rem' }}>
                ✓ Todo listo para registrar
              </div>
            )}
          </div>

          <div className="mt-3">
            <input
              type="submit"
              value="Agregar Usuario"
              className="btn-custom w-100"
              disabled={!formularioEsValido}
              style={{
                padding: '10px',
                fontWeight: 'bold',
                opacity: formularioEsValido ? 1 : 0.5,
                cursor: formularioEsValido ? "pointer" : "not-allowed",
              }}
            />
          </div>
        </form>
      </BasicCard>
    </>
  );
}

export default AddUsers;