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
            rating: promedio,
            created_at: new Date(b.created_at)
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

    if (tipo === "aplicar_filtros_globales") {
      const { base, genres, pages, author } = valor;

      // 2. Filtro Base
      if (base === "populares") {
        lista = lista.filter((b) => Number(b.rating) >= 4.5);
      } else if (base === "nuevos") {
        lista = [...lista].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }

      // 3. Filtro de Autor
      if (author && author.trim() !== "") {
        lista = lista.filter((b) => 
          b.author && b.author.toLowerCase().includes(author.toLowerCase())
        );
      }

      // 4. Filtro de Géneros
      if (genres && genres.length > 0) {
        lista = lista.filter((b) => 
          genres.every(g => b.genres.includes(g))
        );
      }

      // 5. Filtro de Páginas (Solo Mínimo porque el otro no me salió)
      if (pages !== undefined) {
        lista = lista.filter((b) => Number(b.pages) >= Number(pages));
      }

      setFiltered(lista);
    } else if (tipo === "todos") {
      setFiltered(books);
    }
  };

  const buscar = (texto) => {
    setSearch(texto);
    if (!texto.trim()) {
      setFiltered(books);
      return;
    }
    const lista = books.filter((b) =>
      (b.title && b.title.toLowerCase().includes(texto.toLowerCase())) ||
      (b.author && b.author.toLowerCase().includes(texto.toLowerCase()))
    );
    setFiltered(lista);
  };

  return { books, filtered, search, user, filtrar, buscar };
}