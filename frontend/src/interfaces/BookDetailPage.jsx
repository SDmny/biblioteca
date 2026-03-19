import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import DetailBook from "../components/book/DetailBook";

function BookDetailPage() {

  const { id } = useParams();

  const nav = useNavigate();

  const [book, setBook] =
    useState(null);


  useEffect(() => {

    fetch("/data/books.json")
      .then(res => res.json())
      .then(jsonBooks => {

        const localBooks =
          JSON.parse(
            localStorage.getItem("books")
          ) || [];

        const allBooks =
          [...jsonBooks, ...localBooks];

        const found =
          allBooks.find(
            b => String(b.id) === id
          );

        setBook(found);

      });

  }, [id]);


  if (!book) {
    return <p>Cargando...</p>;
  }


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


      <button
        className="btn-volver"
        onClick={() => nav("/catalogo")}
      >
        ← Volver al catálogo
      </button>

    </div>

  );

}

export default BookDetailPage;