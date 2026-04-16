import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const nav = useNavigate();

  const imageSrc = book.image || "/img/default.jpg";

  const getRating = (ratingData) => {
    if (!ratingData) return "0.0";
    if (typeof ratingData === "number") return ratingData.toFixed(1);
    if (ratingData.votos && Array.isArray(ratingData.votos)) {
      if (ratingData.votos.length === 0) return "0.0";
      const suma = ratingData.votos.reduce((acc, v) => acc + (v.puntos || 0), 0);
      return (suma / ratingData.votos.length).toFixed(1);
    }
    return "0.0";
  };

  return (
    <div
      className="libro-card"
      onClick={() => nav("/libro/" + book.id)}
    >
      <img src={imageSrc} alt={book.title} />
      <h4>{book.title}</h4>
      <p>{book.author}</p>
      <span>⭐ {getRating(book.rating)}</span>
    </div>
  );
}

export default BookCard;