import { useState } from "react";
import BasicButton from "../../components/ui/BasicButton";
import EditProfile from "../../components/user/EditProfile";
import BackButton from "../../components/ui/BackButton";

function ProfileView() {
  const user = JSON.parse(localStorage.getItem("user")); // Usuario actual

  const [books, setBooks] = useState(() => {
    const all = JSON.parse(localStorage.getItem("books")) || [];
    return all.filter((b) => b.usuario === user?.usuario);
  });

  const borrarLibro = (id) => {
    const ok = confirm("Borrar libro");
    if (!ok) return;

    let all = JSON.parse(localStorage.getItem("books")) || [];
    all = all.filter((b) => b.id !== id);
    localStorage.setItem("books", JSON.stringify(all));
    setBooks(books.filter((b) => b.id !== id));
  };

  if (!user) return <p>No autorizado</p>;

  return (
    <div className="main-container">
      <BackButton ruta="/" />
      <EditProfile user={user}>
        <BasicButton to={"/add-book"} texto={"Publicar libro"} />

        <hr />

        <h3>Mis libros</h3>

        {books.map((b) => (
          <div key={b.id} className="libro-card p-3 mb-3">
            <h4>{b.title}</h4>
            <p>⭐ {b.rating}</p>
            <p>{b.description}</p>

            <BasicButton to={"/edit-book/" + b.id} texto={"Editar"} />

            <button className="btn-main me-2" onClick={() => borrarLibro(b.id)}>
              Borrar
            </button>
          </div>
        ))}
      </EditProfile>
    </div>
  );
}

export default ProfileView;
