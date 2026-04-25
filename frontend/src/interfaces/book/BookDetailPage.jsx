import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import DetailBook from "../../components/book/DetailBook";
import BackButton from "../../components/ui/BackButton";

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const { data, error } = await supabase
        .from("book")
        .select(`
          *,
          book_genres (
            genre (genre)
          )
        `)
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        setLoading(false);
        return;
      }

      let ownerData = null;
      if (data.user_id) {
        const { data: userData } = await supabase
          .from("user")
          .select("username, name, lastname, image_url")
          .eq("id", data.user_id)
          .maybeSingle();
        ownerData = userData;
      }

      const { data: votesData } = await supabase
        .from("votes")
        .select("voto")
        .eq("book_id", id);

      let calculatedRating = 0;
      if (votesData && votesData.length > 0) {
        const sum = votesData.reduce((acc, curr) => acc + curr.voto, 0);
        calculatedRating = sum / votesData.length;
      }

      const formattedBook = {
        ...data,
        image: data.image_url,
        file: data.pdf_url,
        genres: data.book_genres?.map((bg) => bg.genre?.genre).join(", ") || "Sin género",
        owner: ownerData,
        rating: calculatedRating,
        publishDate: data.date 
      };
      
      setBook(formattedBook);
      setLoading(false);
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div className="main-container"><p>Cargando...</p></div>;
  if (!book) return <div className="main-container"><p>Libro no encontrado.</p></div>;

  return (
    <div className="main-container">
      <DetailBook
        id={book.id}
        title={book.title}
        author={book.author}
        pages={book.pages}
        edition={book.edition}
        genre={book.genres}
        description={book.synopsis}
        imageSrc={book.image}
        file={book.file}
        rating={book.rating}
        owner={book.owner}
        ownerId={book.user_id}
        publishDate={book.publishDate}
      />
      
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-start", width: "100%" }}>
        <BackButton texto="← Volver" />
      </div>
    </div>
  );
}

export default BookDetailPage;