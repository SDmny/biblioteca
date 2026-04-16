import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailBook from "../../components/book/DetailBook";
import BackButton from "../../components/ui/BackButton";

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem("books")) || [];
    const foundBook = localBooks.find((b) => String(b.id) === String(id));
    
    if (foundBook) {
      // Calculamos el promedio decimal si existe la nueva estructura
      const ratingData = foundBook.rating;
      let averageRating = 0;

      if (typeof ratingData === "object" && ratingData.count > 0) {
        averageRating = parseFloat((ratingData.sum / ratingData.count).toFixed(1));
      } else {
        averageRating = ratingData || 0;
      }

      setBook({ ...foundBook, displayRating: averageRating });

      const localUsers = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = localUsers.find((u) => u.usuario === foundBook.usuario);
      setOwner(foundUser);
    }
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
        rating={book.displayRating} // Pasamos el promedio con decimal
        owner={owner}
      />
      
      {owner && (
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          gap: "8px", 
          marginTop: "30px",
          padding: "20px",
          borderTop: "1px solid #eee"
        }}>
          <span style={{ fontSize: "0.85em", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
            Publicado por
          </span>
          <img 
            src={owner.img || "/src/assets/images/user.png"} 
            alt={owner.usuario} 
            style={{ 
              width: "60px", 
              height: "60px", 
              borderRadius: "50%", 
              objectFit: "cover",
              border: "2px solid #f0f0f0",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          />
          <span style={{ fontWeight: "600", fontSize: "1.1em", color: "#333" }}>
            {owner.nombre} {owner.apellido}
          </span>
        </div>
      )}

      <br />
      <BackButton texto="← Volver" />
    </div>
  );
}

export default BookDetailPage;