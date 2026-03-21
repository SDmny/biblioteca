import AddBookForm from "../../components/book/AddBookForm";
import { useNavigate } from "react-router-dom";

function AddBook() {

  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const guardarLibro = (book) => {

    const libros =
      JSON.parse(localStorage.getItem("books")) || [];

    const nuevo = {
      id: Date.now(),
      ...book,
      usuario: user?.usuario || "anonimo",
      rating: 0
    };

    libros.push(nuevo);

    localStorage.setItem("books", JSON.stringify(libros));

    nav("/libros");

  };

  return (
    <AddBookForm onSubmit={guardarLibro} />
  );
}

export default AddBook;