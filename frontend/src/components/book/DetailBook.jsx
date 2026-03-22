import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DetailBook({
  id,
  title,
  author,
  pages,
  edition,
  genre,
  description,
  imageSrc,
  file,
  rating,
}) {
  const [stars, setStars] = useState(rating || 0);

  // Usuario logueado
  const user = JSON.parse(localStorage.getItem("user"));
  const userRol = user?.rol || "user";
  const nav = useNavigate();

  const calificar = (num) => {
    setStars(num);
    let localBooks = JSON.parse(localStorage.getItem("books")) || [];
    const index = localBooks.findIndex((b) => String(b.id) === String(id));
    if (index >= 0) {
      localBooks[index].rating = num;
    } else {
      localBooks.push({
        id,
        title,
        author,
        pages,
        edition,
        genre,
        description,
        image: imageSrc,
        file,
        rating: num,
      });
    }
    localStorage.setItem("books", JSON.stringify(localBooks));
  };

  const renderStars = () => {
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      arr.push(
        <span
          key={i}
          onClick={() => calificar(i)}
          style={{
            fontSize: 22,
            cursor: "pointer",
            color: i <= stars ? "gold" : "lightgray",
          }}
        >
          ★
        </span>
      );
    }
    return arr;
  };

  const imgSrc = imageSrc || "/img/default.jpg";
  const pdfSrc = file;

  const handleDelete = () => {
    const localBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = localBooks.filter((b) => String(b.id) !== String(id));
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    nav(-1);
  };

  const handleEdit = () => {
    nav(`/edit-book/${id}`);
  };

  return (
    <main className="container my-3">
      <div className="card p-4 shadow detalle-libro-card">
        <div className="detalle-libro-container">
          <div className="detalle-libro-info">
            <h3>{title}</h3>
            <p><strong>Autor:</strong> {author}</p>
            <p><strong>Páginas:</strong> {pages}</p>
            <p><strong>Edición:</strong> {edition}</p>
            <p><strong>Género:</strong> {genre}</p>
            <p><strong>Descripción:</strong> {description}</p>

            <div>
              <strong>Calificación:</strong>
              <div>{renderStars()}</div>
            </div>

            <div className="mt-3">
              {user && pdfSrc ? (
                <>
                  <a
                    href={pdfSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-main me-2"
                  >
                    Leer
                  </a>
                  <a
                    href={pdfSrc}
                    download={`${title}.pdf`}
                    className="btn btn-main me-2"
                  >
                    Descargar
                  </a>
                </>
              ) : null}

              {user && pdfSrc && userRol === "admin" ? (
                <>
                  <button className="btn btn-main me-2" onClick={handleEdit}>
                    Editar
                  </button>
                  <button className="btn btn-main me-2" onClick={handleDelete}>
                    Borrar
                  </button>
                </>
              ) : null}

              {!user && pdfSrc && (
                <p className="text-muted">
                  Inicia sesión para leer o descargar este libro.
                </p>
              )}
            </div>
          </div>

          <div className="detalle-libro-imagen">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={title}
                className="img-fluid rounded shadow"
              />
            ) : (
              <p className="text-muted">No hay imagen disponible</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailBook;