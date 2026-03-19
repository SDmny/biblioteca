import BookCard from "./BookCard.jsx";

function BookGrid({ books }) {

  if (!books || books.length === 0) {
    return <p>No hay libros</p>;
  }

  return (

    <div className="book-grid">

      {books.map(book => (

        <BookCard
          key={book.id}
          book={book}
        />

      ))}

    </div>

  );

}

export default BookGrid;