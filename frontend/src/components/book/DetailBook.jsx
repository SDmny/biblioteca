import { useState } from "react";
import BasicButton from "../ui/BasicButton";

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
  rating
}) {
  const [stars, setStars] = useState(rating || 0);

  // Usuario logueado
  const user = JSON.parse(localStorage.getItem("user"));

  const calificar = (num) => {
    setStars(num);
    let localBooks = JSON.parse(localStorage.getItem("books")) || [];
    const index = localBooks.findIndex(b => String(b.id) === String(id));
    if (index >= 0) {
      localBooks[index].rating = num;
    } else {
      localBooks.push({
        id, title, author, pages, edition, genre, description, image: imageSrc, file, rating: num
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
          style={{ fontSize: 22, cursor: "pointer", color: i <= stars ? "gold" : "lightgray" }}
        >
          ★
        </span>
      );
    }
    return arr;
  };

  const imgSrc = imageSrc || "/img/default.jpg";
  const pdfSrc = file;

  return (
    <main className="container my-5">
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
              {user && pdfSrc && (
                <>
                  <a href={pdfSrc} target="_blank" rel="noopener noreferrer" className="btn btn-main me-2">
                    Leer
                  </a>
                  <a href={pdfSrc} download={`${title}.pdf`} className="btn btn-main">
                    Descargar
                  </a>
                </>
              )}

              {!user && pdfSrc && (
                <p className="text-muted">Inicia sesión para leer o descargar este libro.</p>
              )}
            </div>
          </div>

          <div className="detalle-libro-imagen">
            <img src={imgSrc} alt={title} className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailBook;