import { useNavigate } from "react-router-dom";

function BookGrid({
  books = [],
  mode = "all",
}) {

  const nav = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  const isAdmin =
    currentUser &&
    currentUser.rol === "admin";


  const borrarLibro = (id) => {

    const ok = window.confirm(
      "¿Seguro que quieres borrar el libro?"
    );

    if (!ok) return;

    const libros =
      JSON.parse(
        localStorage.getItem("books")
      ) || [];

    const updated =
      libros.filter(
        (b) =>
          String(b.id) !== String(id)
      );

    localStorage.setItem(
      "books",
      JSON.stringify(updated)
    );

    window.location.reload();
  };


  return (

    <div className="book-grid">

      {books.map((book) => (

        <div
          key={book.id}
          className="book-card"
        >

          <div
            className="book-img"
            onClick={() =>
              nav(`/libro/${book.id}`)
            }
          >

            <img
              src={book.image}
              alt={book.title}
            />

          </div>

          <h4
            className="book-title"
            onClick={() =>
              nav(`/libro/${book.id}`)
            }
          >
            {book.title}
          </h4>

          <p className="book-author">
            {book.author}
          </p>

          <p className="book-rating">
            ⭐ {book.rating}
          </p>

          {isAdmin &&
            (mode === "all" ||
              mode === "edit") && (

              <button
                className="btn-main me-2"
                onClick={() =>
                  nav(
                    `/edit-book/${book.id}`
                  )
                }
              >
                Editar
              </button>

            )}

          {isAdmin &&
            (mode === "all" ||
              mode === "delete") && (

              <button
                className="btn-main"
                onClick={() =>
                  borrarLibro(book.id)
                }
              >
                Borrar
              </button>

            )}

        </div>

      ))}

    </div>

  );

}

export default BookGrid;