function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} />
      <h4>{book.title}</h4>
      <p>{book.author}</p>
      <span>{book.rating} ⭐</span>
      <div className="buttons">
        <button>Leer</button>
        <button>Reservar</button>
      </div>
    </div>
  );
}

export default BookCard;
