import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BasicCard from "../../components/ui/BasicCard";
import BackButton from "../../components/ui/BackButton";

function EditProfile({ noExtras = false }) {
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState(user);

  const change = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const changeImg = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm({
        ...form,
        img: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const guardar = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const nuevos = users.map((u) => {
      if (u.usuario === user.usuario) {
        return form;
      }

      return u;
    });

    localStorage.setItem("users", JSON.stringify(nuevos));

    localStorage.setItem("user", JSON.stringify(form));

    alert("Guardado");
  };

  const cerrarSesion = () => {
    localStorage.removeItem("user");

    nav("/");
  };

  const borrarCuenta = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.filter((u) => u.usuario !== user.usuario);

    localStorage.setItem("users", JSON.stringify(users));

    localStorage.removeItem("user");

    nav("/");
  };

  return (
    <>
      <BasicCard titulo="Modificar perfil">
        <div style={{ textAlign: "center" }}>
          <img
            src={form.img || "/src/assets/images/user.png"}
            width="90"
            style={{
              borderRadius: "50%",
            }}
          />

          <br />

          <input type="file" onChange={changeImg} />
        </div>
        <br />
        Nombre
        <input
          className="form-control"
          name="nombre"
          value={form.nombre || ""}
          onChange={change}
        />
        <br />
        Apellido
        <input
          className="form-control"
          name="apellido"
          value={form.apellido || ""}
          onChange={change}
        />
        <br />
        Usuario
        <input
          className="form-control"
          name="usuario"
          value={form.usuario || ""}
          onChange={change}
        />
        <br />
        <button className="btn-main me-2" onClick={guardar}>
          Guardar
        </button>
        {!noExtras ? (
          <>
            <hr />
            <button className="btn-main me-2" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
            <button className="btn-main me-2" onClick={borrarCuenta}>
              Borrar cuenta
            </button>
          </>
        ) : null}
      </BasicCard>
    </>
  );
}

export default EditProfile;
