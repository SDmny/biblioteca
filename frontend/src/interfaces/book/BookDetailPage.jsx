import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailBook from "../../components/book/DetailBook";
import BackButton from "../../components/ui/BackButton";

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem("books")) || [];
    const foundBook = localBooks.find((b) => String(b.id) === String(id));
    setBook(foundBook);
  }, [id]);

  if (!book) return <p>Cargando...</p>;

  return (
    <div className="main-container">
      <DetailBook
        id={book.id}
        title={book.title}
        author={book.author}
        pages={book.pages}
        edition={book.edition}
        genre={book.genre}
        description={book.description}
        imageSrc={book.image}
        file={book.file}
        rating={book.rating}
      />
      <br />
      <BackButton texto="← Volver" />
    </div>
  );
}

export default BookDetailPage;