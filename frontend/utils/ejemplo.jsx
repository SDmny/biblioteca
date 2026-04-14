import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";

export default function App() {
  const [books, setbooks] = useState([]);

  useEffect(() => {
    async function getbooks() {
      const { data: books } = await supabase.from("books").select();

      if (books) {
        setbooks(books);
      }
    }

    getbooks();
  }, []);

  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}
