import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DetailBook from "../../components/book/DetailBook";

function BookDetailPage() {
  const { id } = useParams();

  const nav = useNavigate();

  const [book, setBook] = useState(null);

  const userRol = localStorage.getItem("rol") || "user";

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((jsonBooks) => {
        const localBooks = JSON.parse(localStorage.getItem("books")) || [];

        const allBooks = [...jsonBooks, ...localBooks];

        const found = allBooks.find((b) => String(b.id) === id);

        setBook(found);
      });
  }, [id]);

  if (!book) {
    return <p>Cargando...</p>;
  }

  const handleDelete = () => {
    const localBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = localBooks.filter((b) => String(b.id) !== id);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    nav("/libros");
  };

  const handleEdit = () => {
    nav(`/admin/edit-book/${id}`);
  };

  return (
    <div className="main-container">
      <DetailBook
        title={book.title}
        author={book.author}
        pages={book.pages}
        edition={book.edition}
        genre={book.genre}
        description={book.description}
        imageSrc={book.image}
        file={book.file}
      />

      <br />

      <button className="btn-volver" onClick={() => nav("/libros")}>
        ← Volver al catálogo
      </button>

      {userRol === "admin" && (
        <div className="admin-actions">
          <button className="btn-edit" onClick={handleEdit}>
            Editar
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            Borrar
          </button>
        </div>
      )}
    </div>
  );
}

export default BookDetailPage;
