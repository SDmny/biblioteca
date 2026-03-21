import AddBookForm from "../../components/book/AddBookForm";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const guardarLibro = (book) => {
    const libros = JSON.parse(localStorage.getItem("books")) || [];

    const nuevo = {
      id: Date.now(),
      title: book.title,
      author: book.author,
      edition: book.edition || "",
      genre: book.genre,
      description: book.synopsis || "",
      pages: book.pages,
      date: book.date,
      image: book.image,
      file: book.file,
      usuario: user?.usuario || "anonimo",
      rating: 0,
    };

    libros.push(nuevo);
    localStorage.setItem("books", JSON.stringify(libros));
    nav("/libros");
  };

  return <AddBookForm onSubmit={guardarLibro} />;
}

export default AddBook;