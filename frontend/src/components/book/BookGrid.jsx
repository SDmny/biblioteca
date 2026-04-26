import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";

function BookGrid({ books = [], isAdmin }) {
  const nav = useNavigate();

  const borrarLibro = async (id) => {
    const result = await Swal.fire({
      title: "¿Borrar este libro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2f6fb0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar"
    });

    if (result.isConfirmed) {
      const { error } = await supabase.from("book").delete().eq("id", id);
      if (!error) {
        Swal.fire("Eliminado", "", "success").then(() => window.location.reload());
      }
    }
  };

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%'
        }}>
          
          <div className="book-img" onClick={() => nav(`/libro/${book.id}`)} style={{ cursor: 'pointer' }}>
            <img src={book.image} alt={book.title} />
          </div>
          
          <div style={{ flexGrow: 1 }}>
            <h4 className="book-title" onClick={() => nav(`/libro/${book.id}`)} style={{ cursor: 'pointer', minHeight: '3em' }}>
              {book.title}
            </h4>
            <p className="book-author">{book.author}</p>
            <p className="book-rating">⭐ {typeof book.rating === "number" ? book.rating.toFixed(1) : "0.0"}</p>
          </div>

          {isAdmin && (
            <div style={{ display: "flex", gap: "8px", marginTop: "15px", width: "100%" }}>
              <button
                className="btn-main"
                style={{ flex: 1, padding: "6px", fontSize: "12px", borderRadius: "5px" }}
                onClick={() => nav(`/edit-book/${book.id}`)}
              >
                Editar
              </button>
              <button
                className="btn-main"
                style={{ flex: 1, padding: "6px", fontSize: "12px", borderRadius: "5px", background: "#d33" }}
                onClick={() => borrarLibro(book.id)}
              >
                Borrar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookGrid;