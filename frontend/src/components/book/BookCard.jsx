import { useNavigate } from "react-router-dom";

function BookCard({ book }) {

  const nav = useNavigate();

  return (

    <div
      className="libro-card"
      onClick={() =>
        nav("/libro/" + book.id)
      }
    >

      <img
        src={book.image || "/img/default.jpg"}
        alt={book.title}
      />

      <h4>{book.title}</h4>

      <p>{book.author}</p>

      <span>
        ⭐ {book.rating}
      </span>

    </div>

  );

}

export default BookCard;