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
  const user = JSON.parse(localStorage.getItem("user"));
  const userRol = user?.rol || "user";
  const nav = useNavigate();

  const calcularPromedio = (ratingData) => {
    if (!ratingData || !ratingData.votos || ratingData.votos.length === 0) return 0;
    const suma = ratingData.votos.reduce((acc, v) => acc + (v.puntos || 0), 0);
    return suma / ratingData.votos.length;
  };

  const obtenerMiVoto = (ratingData) => {
    if (!user || !ratingData || !ratingData.votos) return 0;
    const miVoto = ratingData.votos.find((v) => v.usuario === user.usuario);
    return miVoto ? miVoto.puntos : 0;
  };

  const [promedio, setPromedio] = useState(calcularPromedio(rating));
  const [miPuntuacion, setMiPuntuacion] = useState(obtenerMiVoto(rating));

  const calificar = (num) => {
    if (!user) return;
    let localBooks = JSON.parse(localStorage.getItem("books")) || [];
    const index = localBooks.findIndex((b) => String(b.id) === String(id));

    if (index >= 0) {
      let currentRating = localBooks[index].rating;
      if (typeof currentRating !== "object" || !currentRating || !currentRating.votos) {
        currentRating = { votos: [] };
      }
      const votoIndex = currentRating.votos.findIndex((v) => v.usuario === user.usuario);
      if (votoIndex >= 0) {
        currentRating.votos[votoIndex].puntos = num;
      } else {
        currentRating.votos.push({ usuario: user.usuario, puntos: num });
      }
      localBooks[index].rating = currentRating;
      setPromedio(calcularPromedio(currentRating));
      setMiPuntuacion(num);
      localStorage.setItem("books", JSON.stringify(localBooks));
    }
  };

  const renderStars = (puntuacionActual, esInteractivo) => {
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      arr.push(
        <span
          key={i}
          onClick={() => esInteractivo && calificar(i)}
          style={{
            fontSize: esInteractivo ? "24px" : "18px",
            cursor: esInteractivo ? "pointer" : "default",
            color: i <= puntuacionActual ? "gold" : "lightgray",
            marginRight: "3px"
          }}
        >
          ★
        </span>
      );
    }
    return arr;
  };

  const imgSrc = imageSrc || "/img/default.jpg";

  return (
    <main className="container my-3">
      <div className="card p-4 shadow detalle-libro-card">
        <div className="detalle-libro-container">
          <div className="detalle-libro-info">
            <h3>{title || "Sin título"}</h3>
            <p><strong>Autor:</strong> {author || "Desconocido"}</p>
            <p><strong>Páginas:</strong> {pages || "N/A"}</p>
            <p><strong>Edición:</strong> {edition || "N/A"}</p>
            <p><strong>Género:</strong> {genre || "N/A"}</p>
            <p><strong>Descripción:</strong> {description || "Sin descripción"}</p>

            <div className="ratings-wrapper mt-4">
              <div className="mb-2">
                <span className="text-muted small">Promedio general:</span>
                <div className="d-flex align-items-center gap-2">
                  <div>{renderStars(Math.round(promedio), false)}</div>
                  <span className="fw-bold">{promedio > 0 ? promedio.toFixed(1) : "0.0"}</span>
                </div>
              </div>

              {user && (
                <div className="mt-3">
                  <span className="text-muted small">Tu calificación:</span>
                  <div className="d-flex align-items-center gap-2">
                    <div>{renderStars(miPuntuacion, true)}</div>
                    <span className="text-muted small">
                      {miPuntuacion > 0 ? `(${miPuntuacion} estrellas)` : "(sin puntuar)"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              {user && file && (
                <>
                  <a href={file} target="_blank" rel="noopener noreferrer" className="btn btn-main me-2">Leer</a>
                  <a href={file} download={`${title}.pdf`} className="btn btn-main me-2">Descargar</a>
                </>
              )}

              {user && userRol === "admin" && (
                <>
                  <button className="btn btn-main me-2" onClick={() => nav(`/edit-book/${id}`)}>Editar</button>
                  <button className="btn btn-main me-2" onClick={() => {
                    const localBooks = JSON.parse(localStorage.getItem("books")) || [];
                    const updated = localBooks.filter((b) => String(b.id) !== String(id));
                    localStorage.setItem("books", JSON.stringify(updated));
                    nav(-1);
                  }}>Borrar</button>
                </>
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