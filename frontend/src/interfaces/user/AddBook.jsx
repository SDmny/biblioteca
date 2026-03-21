import AddBookForm from "../../components/book/AddBookForm";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="main-container">
        <h2>No autorizado</h2>

        <button className="btn btn-primary" onClick={() => nav("/login")}>
          Login
        </button>
      </div>
    );
  }

  const guardarLibro = (book) => {
    const libros = JSON.parse(localStorage.getItem("books")) || [];

    book.id = Date.now();

    book.usuario = user.usuario;

    libros.push(book);

    localStorage.setItem("books", JSON.stringify(libros));

    alert("Libro guardado");
  };

  return (
    <div className="main-container">
      <AddBookForm onSubmit={guardarLibro} />
    </div>
  );
}

export default AddBook;
