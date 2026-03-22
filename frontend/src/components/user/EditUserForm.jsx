import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BasicInput from "../ui/BasicInput";
import TypeInput from "../ui/TypeInput";
import BasicButton from "../ui/BasicButton";

function EditUserForm({ user, onSubmit, isAdminContext = false, onCancel }) {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normalizar con trim
    const nombreTrimmed = formData.nombre ? formData.nombre.trim() : "";
    const apellidoTrimmed = formData.apellido ? formData.apellido.trim() : "";
    const usuarioTrimmed = formData.usuario ? formData.usuario.trim() : "";
    const emailTrimmed = formData.email ? formData.email.trim() : "";
    const fecNac = formData.fec_nac;

    // Validaciones obligatorias
    if (!nombreTrimmed || !apellidoTrimmed || !usuarioTrimmed || !emailTrimmed || !fecNac) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
      return;
    }

    // Validar fecha mínima (>= 1900)
    const year = new Date(fecNac).getFullYear();
    if (year < 1900) {
      Swal.fire("Error", "La fecha de nacimiento no puede ser anterior a 1900", "error");
      return;
    }

    // Validar email
    if (!/\S+@\S+\.\S+/.test(emailTrimmed)) {
      Swal.fire("Error", "Correo electrónico inválido", "error");
      return;
    }

    // Validar usuario (igual que en creación)
    if (!/^[A-Za-z0-9_-]+$/.test(usuarioTrimmed)) {
      Swal.fire(
        "Error",
        "El nombre de usuario solo puede contener letras, números, guion (-) y guion bajo (_), sin espacios",
        "error"
      );
      return;
    }

    // Validar contraseña (solo si se cambia)
    if (formData.password && formData.password.length < 6) {
      Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    onSubmit({
      ...formData,
      nombre: nombreTrimmed,
      apellido: apellidoTrimmed,
      usuario: usuarioTrimmed,
      email: emailTrimmed,
    });
  };

  return (
    <>
      <h2>{isAdminContext ? "Editar usuario" : "Editar perfil"}</h2>
      <form onSubmit={handleSubmit}>
        <BasicInput label={"Nombre"}>
          <TypeInput type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </BasicInput>

        <BasicInput label={"Apellido"}>
          <TypeInput type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
        </BasicInput>

        <BasicInput label={"Fecha de nacimiento"}>
          <TypeInput type="date" name="fec_nac" value={formData.fec_nac} onChange={handleChange} required />
        </BasicInput>

        <BasicInput label={"Correo electrónico"}>
          <TypeInput type="email" name="email" value={formData.email} onChange={handleChange} required />
        </BasicInput>

        <BasicInput label={"Nombre de usuario"}>
          <TypeInput
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
            disabled={!isAdminContext} // solo editable por admin
          />
        </BasicInput>

        <BasicInput label={"Contraseña"}>
          <TypeInput type="password" name="password" value={formData.password || ""} onChange={handleChange} />
        </BasicInput>

        <BasicInput label={"Verificar contraseña"}>
          <TypeInput type="password" name="confirm_password" value={formData.confirm_password || ""} onChange={handleChange} />
        </BasicInput>

        {isAdminContext && (
          <BasicInput label={"Rol"}>
            <select name="rol" value={formData.rol} onChange={handleChange} required className="form-control">
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