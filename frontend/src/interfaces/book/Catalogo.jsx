import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/book/Sidebar.jsx";
import BookGrid from "../../components/book/BookGrid.jsx";
import BasicButton from "../../components/ui/BasicButton";

function Catalogo() {
  const nav = useNavigate();

  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("/data/books.json")
      .then((res) => res.json())
      .then((jsonBooks) => {
        const localBooks = JSON.parse(localStorage.getItem("books")) || [];

        const merged = jsonBooks.map((b) => {
          const local = localBooks.find((l) => String(l.id) === String(b.id));

          if (local) {
            return {
              ...b,
              ...local,
            };
          }

          return b;
        });

        const extras = localBooks.filter(
          (l) => !jsonBooks.find((j) => String(j.id) === String(l.id)),
        );

        const allBooks = [...merged, ...extras];

        setBooks(allBooks);
        setFiltered(allBooks);
      });
  }, []);

  const filtrar = (tipo, valor) => {
    let lista = [...books];

    if (tipo === "todos") lista = books;

    if (tipo === "populares")
      lista = lista.filter((b) => Number(b.rating) >= 4.5);

    if (tipo === "genero") lista = lista.filter((b) => b.genre === valor);

    if (tipo === "idioma") lista = lista.filter((b) => b.language === valor);

    if (tipo === "largos") lista = lista.filter((b) => b.pages > 400);

    setFiltered(lista);
  };

  const buscar = (texto) => {
    setSearch(texto);

    const lista = books.filter((b) =>
      b.title.toLowerCase().includes(texto.toLowerCase()),
    );

    setFiltered(lista);
  };

  return (
    <div className="catalog-container">
      <Sidebar filtrar={filtrar} />

      <div className="catalog-content">
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <input
            className="form-control"
            style={{
              height: 35,
              padding: "4px 8px",
            }}
            placeholder="Buscar libro..."
            value={search}
            onChange={(e) => buscar(e.target.value)}
          />

          {user && (
            <button className="btn btn-main" onClick={() => nav("/add-book")}>
              Añadir libro
            </button>
          )}
        </div>

        <BookGrid books={filtered} />
      </div>
    </div>
  );
}

export default Catalogo;
