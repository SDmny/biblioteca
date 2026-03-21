import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BasicCard from "../../components/ui/BasicCard";
import BasicButton from "../../components/ui/BasicButton";

function ProfileView() {

  const nav = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [books, setBooks] =
    useState([]);


  useEffect(() => {

    const all =
      JSON.parse(
        localStorage.getItem("books")
      ) || [];

    const mine =
      all.filter(
        b => b.usuario === user.usuario
      );

    setBooks(mine);

  }, []);


  const borrarLibro = (id) => {

    const ok =
      confirm("Borrar libro");

    if (!ok) return;

    let all =
      JSON.parse(
        localStorage.getItem("books")
      ) || [];

    all =
      all.filter(
        b => b.id !== id
      );

    localStorage.setItem(
      "books",
      JSON.stringify(all)
    );

    setBooks(
      books.filter(
        b => b.id !== id
      )
    );

  };


  if (!user) return <p>No autorizado</p>;


  return (

    <div className="main-container">

      <BasicCard titulo="Perfil">

        <div style={{ textAlign:"center" }}>

          <img
            src={
              user.img ||
              "/src/assets/images/user.png"
            }
            width="90"
            style={{
              borderRadius:"50%"
            }}
          />

          <h3>
            {user.nombre} {user.apellido}
          </h3>

          <p>
            {user.usuario}
          </p>

        </div>


        <br />


        <button
          className="btn-main me-2"
          onClick={() =>
            nav("/profile-edit")
          }
        >
          Modificar datos
        </button>


        <button
          className="btn-main me-2"
          onClick={() =>
            nav("/add-book")
          }
        >
          Publicar libro
        </button>


        <hr />


        <h3>Mis libros</h3>


        {books.map(b => (

          <div
            key={b.id}
            className="libro-card p-3 mb-3"
          >

            <h4>{b.title}</h4>

            <p>
              ⭐ {b.rating}
            </p>

            <p>
              {b.description}
            </p>


            <button
              className="btn-main me-2"
              onClick={() =>
                nav(
                  "/editar-libro/" + b.id
                )
              }
            >
              Editar
            </button>


            <button
              className="btn-main me-2"
              onClick={() =>
                borrarLibro(b.id)
              }
            >
              Borrar
            </button>

          </div>

        ))}

      </BasicCard>

    </div>

  );

}

export default ProfileView;