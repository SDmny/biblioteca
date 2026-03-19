import BookGrid from "../components/book/BookGrid.jsx";
import Sidebar from "../components/book/Sidebar.jsx";
import { useEffect, useState } from "react";

function Catalogo() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("public/data/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
      <div className="header">
        <h2>BIBLIOTECA DIGITAL - CATÁLOGO DE LIBROS</h2>
      </div>
      <div className="actions">
        <input type="text" placeholder="Buscar por título, autor o género..." />
        <button>🔍</button>
      </div>
      <div className="app">
        <div className="main">
          <Sidebar />
          <BookGrid books={books} />
        </div>
      </div>
    </>
  );
}

export default Catalogo;
