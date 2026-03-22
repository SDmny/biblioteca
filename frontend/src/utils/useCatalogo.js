import { useEffect, useState } from "react";

export function useCatalogo() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(localBooks);
    setFiltered(localBooks);
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

  return { books, filtered, search, user, filtrar, buscar };
}