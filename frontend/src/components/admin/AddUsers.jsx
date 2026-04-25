import { useState } from "react";
import { supabase } from "../../utils/supabase.js";
import Swal from "sweetalert2";

import BasicCard from "../ui/BasicCard.jsx";
import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";

function AddUsers({ onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fec_nac: "",
    email: "",
    usuario: "",
    rol: "usuario",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("user").insert({
      email: form.email.trim(),
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
          <BasicInput label="Nombre">
            <TypeInput
              name="nombre"
              value={form.nombre}
              onChange={change}
              required
            />
          </BasicInput>
          <BasicInput label="Apellido">
            <TypeInput
              name="apellido"
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
              value={form.email}
              onChange={change}
              required
            />
          </BasicInput>
          <BasicInput label="Usuario">
            <TypeInput
              name="usuario"
              value={form.usuario}
              onChange={change}
              required
            />
          </BasicInput>
          <BasicInput label="Rol">
            <select
              name="rol"
              value={form.rol}
              onChange={change}
              className="form-control"
              required
            >
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
            </select>
          </BasicInput>

          <input type="submit" value="Agregar Usuario" className="btn-custom" />
        </form>
      </BasicCard>
    </>
  );
}

export default AddUsers;
