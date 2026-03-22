import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BasicCard from "../ui/BasicCard.jsx";
import BasicInput from "../ui/BasicInput.jsx";
import TypeInput from "../ui/TypeInput.jsx";
import BackButton from "../ui/BackButton.jsx";

function AddUsers({ user = null, onBack }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    password: "",
    rol: "user",
  });

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.usuario || !form.email || !form.password) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Swal.fire("Error", "Correo electrónico inválido", "error");
      return;
    }

    if (form.password.length < 6) {
      Swal.fire("Error", "La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (user) {
      users = users.map((u) => (u.usuario === user.usuario ? form : u));
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    } else {
      if (users.some((u) => u.usuario === form.usuario)) {
        Swal.fire("Error", "Ese usuario ya existe", "error");
        return;
      }
      users.push(form);
      localStorage.setItem("users", JSON.stringify(users));
      Swal.fire("Éxito", "Usuario creado correctamente", "success");
    }

    setTimeout(() => {
      onBack();
    }, 100);
  };

  return (
    <BasicCard titulo={user ? "Editar Usuario" : "Crear Usuario"}>
      <BackButton />
      <form onSubmit={submit}>
        <BasicInput label="Nombre">
          <TypeInput type="text" name="nombre" value={form.nombre} onChange={change} />
        </BasicInput>
        <BasicInput label="Apellido">
          <TypeInput type="text" name="apellido" value={form.apellido} onChange={change} />
        </BasicInput>
        <BasicInput label="Usuario">
          <TypeInput type="text" name="usuario" value={form.usuario} onChange={change} />
        </BasicInput>
        <BasicInput label="Email">
          <TypeInput type="email" name="email" value={form.email} onChange={change} />
        </BasicInput>
        <BasicInput label="Password">
          <TypeInput type="text" name="password" value={form.password} onChange={change} />
        </BasicInput>
        <BasicInput label="Rol">
          <select name="rol" value={form.rol} onChange={change} className="form-control">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </BasicInput>
        <button className="btn-main" type="submit">
          Guardar
        </button>
      </form>
    </BasicCard>
  );
}

export default AddUsers;