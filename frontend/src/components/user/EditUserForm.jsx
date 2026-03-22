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
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre || !formData.apellido || !formData.fec_nac || !formData.email || !formData.usuario) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      Swal.fire("Contraseña inválida", "Debe tener al menos 6 caracteres", "error");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    if (formData.num_edicion && isNaN(formData.num_edicion)) {
      Swal.fire("Error", "El número de edición debe ser numérico", "error");
      return;
    }

    if (formData.num_paginas && isNaN(formData.num_paginas)) {
      Swal.fire("Error", "El número de páginas debe ser numérico", "error");
      return;
    }

    if (formData.pdf && formData.pdf.type !== "application/pdf") {
      Swal.fire("Error", "Debes subir un archivo PDF válido", "error");
      return;
    }

    Swal.fire("Éxito", "Datos guardados correctamente", "success");
    onSubmit(formData);
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
          <TypeInput type="text" name="usuario" value={formData.usuario} onChange={handleChange} required disabled={!isAdminContext} />
        </BasicInput>

        <BasicInput label={"Contraseña"}>
          <TypeInput type="password" name="password" value={formData.password} onChange={handleChange} />
        </BasicInput>

        <BasicInput label={"Verificar contraseña"}>
          <TypeInput type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
        </BasicInput>

        <BasicInput label={"Número de edición"}>
          <TypeInput type="number" name="num_edicion" value={formData.num_edicion || ""} onChange={handleChange} />
        </BasicInput>

        <BasicInput label={"Número de páginas"}>
          <TypeInput type="number" name="num_paginas" value={formData.num_paginas || ""} onChange={handleChange} />
        </BasicInput>

        <BasicInput label={"Subir PDF"}>
          <input type="file" name="pdf" accept="application/pdf" onChange={handleChange} />
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