import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const nav = useNavigate();

  const imageSrc = book.image || "/img/default.jpg";

  return (
    <div
      className="libro-card"
      onClick={() => nav("/libro/" + book.id)}
    >
      <img src={imageSrc} alt={book.title} />
      <h4>{book.title}</h4>
      <p>{book.author}</p>
      <span>⭐ {book.rating}</span>
    </div>
  );
}

export default BookCard;