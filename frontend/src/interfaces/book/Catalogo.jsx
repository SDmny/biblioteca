import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/book/Sidebar.jsx";
import BookGrid from "../../components/book/BookGrid.jsx";

function Catalogo() {
  const nav = useNavigate();

  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((jsonBooks) => {
        const localBooks = JSON.parse(localStorage.getItem("books")) || [];

        const allBooks = [...jsonBooks, ...localBooks];

        setBooks(allBooks);
        setFiltered(allBooks);
      });
  }, []);

  const filtrar = (tipo, valor) => {
    let lista = [...books];

    if (tipo === "todos") {
      lista = books;
    }

    if (tipo === "populares") {
      lista = lista.filter((b) => Number(b.rating) >= 4.5);
    }

    if (tipo === "nuevos") {
      const hoy = new Date();

      lista = lista.filter((b) => {
        if (!b.date) return false;

        const fecha = new Date(b.date);

        const diff = (hoy - fecha) / (1000 * 60 * 60 * 24);

        return diff <= 30;
      });
    }

    if (tipo === "genero") {
      lista = lista.filter((b) => b.genre === valor);
    }

    if (tipo === "idioma") {
      lista = lista.filter((b) => b.language === valor);
    }

    if (tipo === "largos") {
      lista = lista.filter((b) => b.pages > 400);
    }

    setFiltered(lista);
  };

  return (
    <div className="catalog-container">
      <Sidebar filtrar={filtrar} />

      <div className="catalog-content">
        {user && (
          <button
            className="btn-main"
            style={{ marginBottom: 15 }}
            onClick={() => nav("/dashboard")}
          >
            Añadir libro
          </button>
        )}

        <BookGrid books={filtered} />
      </div>
    </div>
  );
}

export default Catalogo;
