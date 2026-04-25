import { useState } from "react";
import { supabase } from "../../utils/supabase.js";
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
        const year = new Date(value).getFullYear();
        if (year < 1900) error = "El año no puede ser anterior a 1900";
        break;
      }
      case "password":
        if (value.length < 6)
          error = "La contraseña debe contener al menos 6 caracteres";
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

    const { error } = await supabase.from("user").insert({
      email: form.email.trim(),
      password: form.password,
      username: form.usuario.trim(),
      role: form.rol,
      name: form.nombre.trim(),
      lastname: form.apellido.trim(),
      birthdate: form.fec_nac,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
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
          <input type="submit" value="Agregar Usuario" className="btn-custom" />
        </form>
      </BasicCard>
    </>
  );
}

export default AddUsers;
