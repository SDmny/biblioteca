function DetailBook() {
  return (
    <>
      <main className="container my-5">
        <h2 className="mb-4">Detalle del Libro</h2>
        <div className="card p-4 shadow detalle-libro-card">
          <div className="detalle-libro-container">
            <div className="detalle-libro-info">
              <h3 className="mb-3">Título del libro</h3>
              <p>
                <strong>Autor: </strong>Nombre del autor
              </p>
              <p>
                <strong>Número de páginas: </strong>0000
              </p>
              <p>
                <strong>Edición: </strong>Edición
              </p>
              <p>
                <strong>Género: </strong>Género del libro
              </p>
              <p>
                <strong>Descripción:</strong> Descripción del libro. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="detalle-libro-imagen">
              <div className="text-center my-4">
                <img
                  src="imagenes/portada_libro.jpg"
                  alt="Portada del libro"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetailBook;
