import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useCatalogo() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      const { data, error } = await supabase
        .from("book")
        .select(`
          *,
          book_genres (
            genre (genre)
          ),
          votes (voto)
        `);

      if (error) {
        console.error("Error al obtener libros:", error);
      } else {
        const formattedBooks = data.map((b) => {
          const totalVotos = b.votes?.length || 0;
          const promedio = totalVotos > 0 
            ? b.votes.reduce((acc, curr) => acc + curr.voto, 0) / totalVotos 
            : 0;

          return {
            ...b,
            image: b.image_url,
            genres: b.book_genres.map((bg) => bg.genre.genre),
            rating: promedio
          };
        });
        setBooks(formattedBooks);
        setFiltered(formattedBooks);
      }
    };

    fetchData();
  }, []);

  const filtrar = (tipo, valor) => {
    let lista = [...books];

    if (tipo === "todos") {
      lista = books;
    } else if (tipo === "populares") {
      lista = lista.filter((b) => Number(b.rating) >= 4.5);
    } else if (tipo === "genero") {
      lista = lista.filter((b) => b.genres.includes(valor));
    } else if (tipo === "largos") {
      lista = lista.filter((b) => b.pages > 400);
    }

    setFiltered(lista);
  };

  const buscar = (texto) => {
    setSearch(texto);
    const lista = books.filter((b) =>
      b.title.toLowerCase().includes(texto.toLowerCase()) ||
      b.author.toLowerCase().includes(texto.toLowerCase())
    );
    setFiltered(lista);
  };

  return { books, filtered, search, user, filtrar, buscar };
}