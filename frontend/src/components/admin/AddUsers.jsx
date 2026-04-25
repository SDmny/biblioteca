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
        const year = new Date(value).getFullYear();
        if (year < 1900) error = "El año no puede ser anterior a 1900";
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

  const formularioEsValido = () => {
    const hayCamposVacios =
      !form.nombre ||
      !form.apellido ||
      !form.email ||
      !form.usuario ||
      !form.password ||
      !form.confirm_password ||
      !form.fec_nac;
    const hayErrores = Object.values(errors).some((error) => error !== "");
    return !hayCamposVacios && !hayErrores;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!formularioEsValido()) return;

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
          <br />
          <input
            type="submit"
            value="Agregar Usuario"
            className="btn-custom"
            disabled={!formularioEsValido()}
            style={{
              opacity: formularioEsValido() ? 1 : 0.5,
              cursor: formularioEsValido() ? "pointer" : "not-allowed",
            }}
          />{" "}
        </form>
      </BasicCard>
    </>
  );
}

export default AddUsers;
