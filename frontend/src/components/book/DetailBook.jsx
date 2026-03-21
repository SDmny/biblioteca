function DetailBook({
  title,
  author,
  pages,
  edition,
  genre,
  description,
  imageSrc,
  file,
}) {
  return (
    <main className="container my-5">
      <div className="card p-4 shadow detalle-libro-card">
        <div className="detalle-libro-container">
          <div className="detalle-libro-info">
            <h3 className="mb-3">{title}</h3>

            <p>
              <strong>Autor: </strong>
              {author}
            </p>

            <p>
              <strong>Número de páginas: </strong>
              {pages}
            </p>

            <p>
              <strong>Edición: </strong>
              {edition}
            </p>

            <p>
              <strong>Género: </strong>
              {genre}
            </p>

            <p>
              <strong>Descripción: </strong>
              {description}
            </p>

            <div className="mt-3">
              <a href={file} target="_blank" className="btn btn-main me-2">
                Leer
              </a>

              <a href={file} download className="btn btn-main">
                Descargar
              </a>
            </div>
          </div>

          <div className="detalle-libro-imagen">
            <div className="text-center my-4">
              <img
                src={imageSrc}
                alt={`Portada de ${title}`}
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailBook;
