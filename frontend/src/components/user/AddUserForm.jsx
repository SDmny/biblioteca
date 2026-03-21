import { useState } from "react";
import BasicInput from "../ui/BasicInput";
import TypeInput from "../ui/TypeInput";
import BasicButton from "../ui/BasicButton";

function AddUserForm({ onSubmit, isAdminContext = false }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fec_nac: "",
    email: "",
    usuario: "",
    password: "",
    confirm_password: "",
    rol: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Las contraseñas no coinciden");
      return;
    }
    onSubmit(formData);
  };

  return (
    <>
      <h2>{isAdminContext ? "Crear usuario" : "Registrarse"}</h2>

      <form onSubmit={handleSubmit}>
        <BasicInput label={"Nombre"}>
          <TypeInput
            type={"text"}
            name={"nombre"}
            placeholder={"Nombres(s)"}
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </BasicInput>
        <BasicInput label={"Apellido"}>
          <TypeInput
            type={"text"}
            name={"apellido"}
            placeholder={"Apellido(s)"}
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </BasicInput>
        <BasicInput label={"Fecha de nacimiento"}>
          <TypeInput
            type={"date"}
            name={"fec_nac"}
            placeholder={"Nombres(s)"}
            value={formData.fec_nac}
            onChange={handleChange}
            required
          />
        </BasicInput>
        <BasicInput label={"Correo electrónico"}>
          <TypeInput
            type={"email"}
            name={"email"}
            placeholder={"correo@ejemplo.com"}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </BasicInput>
        <BasicInput label={"Nombre de usuario"}>
          <TypeInput
            type={"text"}
            name={"usuario"}
            placeholder={"Usuario"}
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </BasicInput>
        <BasicInput label={"Contraseña"}>
          <TypeInput
            type={"password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </BasicInput>
        <BasicInput label={"Verificar contraseña"}>
          <TypeInput
            type={"password"}
            name={"confirm_password"}
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </BasicInput>

        {isAdminContext && (
          <BasicInput label={"Rol"}>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </BasicInput>
        )}

        <input type="submit" value="Registrarse" className=" btn-custom" />
        <BasicButton to={"/"} texto={"Volver"} />
      </form>
    </>
  );
}

export default AddUserForm;
