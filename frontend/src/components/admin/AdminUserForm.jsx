import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BasicInput from "../ui/BasicInput";
import TypeInput from "../ui/TypeInput";
import BasicCard from "../ui/BasicCard.jsx";
import BackButton from "../ui/BackButton.jsx";

const emptyForm = {
  nombre: "",
  apellido: "",
  fec_nac: "",
  email: "",
  usuario: "",
  password: "",
  confirm_password: "",
  rol: "user",
};

function AdminUserForm() {
  const { usuario: usuarioParam } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyForm);
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const isEdit = Boolean(usuarioParam);

  useEffect(() => {
    if (!isEdit) {
      setFormData(emptyForm);
      setLoaded(true);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.usuario === usuarioParam);

    if (!found) {
      setNotFound(true);
      setLoaded(true);
      return;
    }

    setFormData({
      nombre: found.nombre || "",
      apellido: found.apellido || "",
      fec_nac: found.fec_nac || "",
      email: found.email || "",
      usuario: found.usuario || "",
      password: found.password || "",
      confirm_password: found.password || "",
      rol: found.rol || "user",
    });

    setLoaded(true);
  }, [isEdit, usuarioParam]);

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

    // Validaciones
    if (!nombreTrimmed || !apellidoTrimmed || !usuarioTrimmed || !emailTrimmed || !fecNac) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
      return;
    }

    const year = new Date(fecNac).getFullYear();
    if (year < 1900) {
      Swal.fire("Error", "La fecha de nacimiento no puede ser anterior a 1900", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(emailTrimmed)) {
      Swal.fire("Error", "Correo electrónico inválido", "error");
      return;
    }

    if (!/^[A-Za-z0-9_-]+$/.test(usuarioTrimmed)) {
      Swal.fire(
        "Error",
        "El nombre de usuario solo puede contener letras, números, guion (-) y guion bajo (_), sin espacios",
        "error"
      );
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isEdit) {
      const updated = users.map((u) =>
        u.usuario === usuarioParam
          ? {
              nombre: nombreTrimmed,
              apellido: apellidoTrimmed,
              fec_nac: fecNac,
              email: emailTrimmed,
              usuario: usuarioTrimmed,
              password: formData.password,
              rol: formData.rol,
            }
          : u
      );

      localStorage.setItem("users", JSON.stringify(updated));

      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser && currentUser.usuario === usuarioParam) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            nombre: nombreTrimmed,
            apellido: apellidoTrimmed,
            fec_nac: fecNac,
            email: emailTrimmed,
            usuario: usuarioTrimmed,
            password: formData.password,
            rol: formData.rol,
          })
        );
      }

      Swal.fire("Éxito", "Usuario actualizado correctamente", "success").then(() => navigate("/admin"));
      return;
    }

    if (users.some((u) => u.usuario === usuarioTrimmed)) {
      Swal.fire("Error", "Ese usuario ya existe", "error");
      return;
    }

    users.push({
      nombre: nombreTrimmed,
      apellido: apellidoTrimmed,
      fec_nac: fecNac,
      email: emailTrimmed,
      usuario: usuarioTrimmed,
      password: formData.password,
      rol: formData.rol,
    });

    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire("Éxito", "Usuario creado correctamente", "success").then(() => navigate("/admin"));
  };

  if (!loaded) {
    return (
      <BasicCard titulo={isEdit ? "Editar usuario" : "Crear usuario"}>
        <p>Cargando...</p>
      </BasicCard>
    );
  }

  if (notFound) {
    return (
      <BasicCard titulo="Usuario no encontrado">
        <BackButton />
      </BasicCard>
    );
  }

  return (
    <BasicCard titulo={isEdit ? "Editar usuario" : "Crear usuario"}>
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
          <TypeInput type="text" name="usuario" value={formData.usuario} onChange={handleChange} required />
        </BasicInput>

        <BasicInput label={"Contraseña"}>
          <TypeInput type="password" name="password" value={formData.password} onChange={handleChange} />
        </BasicInput>

        <BasicInput label={"Verificar contraseña"}>
          <TypeInput type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
        </BasicInput>

        <BasicInput label={"Rol"}>
          <select name="rol" value={formData.rol} onChange={handleChange} required className="form-control">
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </BasicInput>

        <div style={{ marginTop: "10px" }}>
          <input type="submit" value={isEdit ? "Guardar cambios" : "Crear usuario"} className="btn-custom me-2" />
          <button type="button" className="btn-main" onClick={() => navigate("/admin")}>
            Volver
          </button>
        </div>
      </form>
    </BasicCard>
  );
}

export default AdminUserForm;