import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const nav = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  const [form, setForm] =
    useState(user);


  const change = (e) => {

    const { name, value } =
      e.target;

    setForm({
      ...form,
      [name]: value,
    });

  };

  const changeImg = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {

      setForm({
        ...form,
        img: reader.result,
      });

    };

    reader.readAsDataURL(file);

  };

  const guardar = () => {

  let users =
    JSON.parse(
      localStorage.getItem("users")
    ) || [];


  const nuevos = users.map(u => {

    if (u.usuario === user.usuario) {

      return form;

    }

    return u;

  });


  localStorage.setItem(
    "users",
    JSON.stringify(nuevos)
  );


  localStorage.setItem(
    "user",
    JSON.stringify(form)
  );


  alert("Datos guardados");

};

  const cerrarSesion = () => {

    const ok =
      confirm(
        "¿Deseas cerrar sesión?"
      );

    if (!ok) return;

    localStorage.removeItem("user");

    nav("/");

  };


  const borrarCuenta = () => {

    const ok =
      confirm(
        "¿Seguro que deseas borrar la cuenta? Este cambio es permanente."
      );

    if (!ok) return;


    let users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];


    const nuevos =
      users.filter(
        u =>
          u.usuario !== user.usuario
      );


    localStorage.setItem(
      "users",
      JSON.stringify(nuevos)
    );


    localStorage.removeItem("user");


    alert("Cuenta eliminada");

    nav("/");

  };


  return (

    <div className="main-container">

      <div className="card-section">


        <div className="card-box">


          <div
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >

            <img
              src={
                form.img ||
                "/img/user.png"
              }
              width="120"
              style={{
                borderRadius: "50%",
                border:
                  "3px solid var(--clr-azul2)",
              }}
            />


            <br />

            <input
              type="file"
              onChange={changeImg}
            />

          </div>


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


          <button
            className="btn-main"
            onClick={guardar}
          >
            Guardar cambios
          </button>


          <hr />


          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >

            <button
              className="btn-main"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>


            <button
              className="btn-volver"
              onClick={borrarCuenta}
            >
              Borrar cuenta
            </button>

          </div>


        </div>

      </div>

    </div>

  );

}

export default ProfilePage;