import { useState, useEffect } from "react";
import BasicInput from "../ui/BasicInput";
import TypeInput from "../ui/TypeInput";
import BasicButton from "../ui/BasicButton";

function EditUserForm({ user, onSubmit, isAdminContext = false, onCancel }) {
  const [formData, setFormData] = useState(user);

  // Actualiza el estado si cambia el usuario a editar
  useEffect(() => {
    setFormData(user);
  }, [user]);

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
      <h2>{isAdminContext ? "Editar usuario" : "Editar perfil"}</h2>

      <form onSubmit={handleSubmit}>
        <BasicInput label={"Nombre"}>
          <TypeInput
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Apellido"}>
          <TypeInput
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Fecha de nacimiento"}>
          <TypeInput
            type="date"
            name="fec_nac"
            value={formData.fec_nac}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Correo electrónico"}>
          <TypeInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Nombre de usuario"}>
          <TypeInput
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
            disabled // 👈 normalmente no se cambia el username
          />
        </BasicInput>

        <BasicInput label={"Contraseña"}>
          <TypeInput
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </BasicInput>

        <BasicInput label={"Verificar contraseña"}>
          <TypeInput
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
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

        <input type="submit" value="Guardar cambios" className="btn-custom" />
        {onCancel && <BasicButton onClick={onCancel} texto="Cancelar" />}
      </form>
    </>
  );
}

export default EditUserForm;
