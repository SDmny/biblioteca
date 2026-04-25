import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";
import BasicCard from "../../components/ui/BasicCard.jsx";
import BasicInput from "../../components/ui/BasicInput.jsx";
import TypeInput from "../../components/ui/TypeInput.jsx";
import BackButton from "../../components/ui/BackButton.jsx";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    edition: "",
    synopsis: "",
    pages: "",
    date: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentFiles, setCurrentFiles] = useState({ image: "", pdf: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener lista de géneros
        const { data: genres } = await supabase
          .from("genre")
          .select("*")
          .order("genre", { ascending: true });
        setGenresList(genres || []);

        // 2. Obtener datos del libro
        const { data: book, error: bookError } = await supabase
          .from("book")
          .select("*, book_genres(genre_id)")
          .eq("id", id)
          .single();

        if (bookError) throw bookError;

        setForm({
          title: book.title || "",
          author: book.author || "",
          edition: book.edition || "",
          synopsis: book.synopsis || "",
          pages: book.pages || "",
          date: book.date || "",
        });

        setCurrentFiles({ image: book.image_url, pdf: book.pdf_url });
        setImagePreview(book.image_url);
        setSelectedGenres(book.book_genres.map(bg => bg.genre_id));

      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo cargar el libro", "error");
        navigate("/libros");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToStorage = async (file, bucket) => {
    if (!file) return null;

    // Nombre único para que el navegador no use la imagen vieja en caché
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) return Swal.fire("Género", "Selecciona al menos un género", "warning");

    setIsSubmitting(true);
    Swal.fire({
      title: "Actualizando...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // 1. Subir archivos
      const imageUrl = imageFile ? await uploadToStorage(imageFile, "Images_books") : currentFiles.image;
      const pdfUrl = pdfFile ? await uploadToStorage(pdfFile, "books_pdfs") : currentFiles.pdf;

      // 2. Actualizar datos del libro
      const { error: bookError } = await supabase
        .from("book")
        .update({
          title: form.title.trim(),
          author: form.author.trim(),
          edition: form.edition,
          synopsis: form.synopsis,
          pages: parseInt(form.pages),
          date: form.date,
          image_url: imageUrl,
          pdf_url: pdfUrl,
        })
        .eq("id", id);

      if (bookError) throw bookError;

      await supabase.from("book_genres").delete().eq("book_id", id);
      const { error: genError } = await supabase.from("book_genres").insert(
        selectedGenres.map(gid => ({ book_id: id, genre_id: gid }))
      );
      if (genError) throw genError;

      await Swal.fire("Éxito", "Cambios guardados correctamente", "success");
      navigate(`/libro/${id}`);

    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredGenres = genresList.filter((g) =>
    g.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <BasicCard titulo={"Editar Libro"}>
      <form onSubmit={submit}>
        <BasicInput label={"Título"}>
          <TypeInput type="text" name="title" value={form.title} onChange={change} required disabled={isSubmitting} />
        </BasicInput>

        <div className="row">
          <div className="col-md-6">
            <BasicInput label={"Autor"}>
              <TypeInput type="text" name="author" value={form.author} onChange={change} required disabled={isSubmitting} />
            </BasicInput>
          </div>
          <div className="col-md-6">
            <BasicInput label={"Edición"}>
              <TypeInput type="text" name="edition" value={form.edition} onChange={change} required disabled={isSubmitting} />
            </BasicInput>
          </div>
        </div>

        <BasicInput label={"Géneros"}>
          <input 
            type="text" className="form-control form-control-sm mb-2" 
            placeholder="Buscar género..." value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
            gap: '8px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px',
            maxHeight: '150px', overflowY: 'auto', backgroundColor: '#fff' 
          }}>
            {filteredGenres.map((g) => (
              <label key={g.id} style={{ display: 'flex', alignItems: 'center', fontSize: '0.85em', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g.id)}
                  onChange={() => {
                    setSelectedGenres(prev => 
                      prev.includes(g.id) ? prev.filter(i => i !== g.id) : [...prev, g.id]
                    );
                  }}
                  disabled={isSubmitting}
                  style={{ marginRight: '5px' }}
                />
                {g.genre}
              </label>
            ))}
          </div>
        </BasicInput>

        <BasicInput label={"Sinopsis"}>
          <textarea className="form-control" name="synopsis" value={form.synopsis} onChange={change} rows="3" disabled={isSubmitting} />
        </BasicInput>

        <div className="row">
          <div className="col-md-6">
            <BasicInput label={"Páginas"}>
              <TypeInput type="number" name="pages" value={form.pages} onChange={change} required disabled={isSubmitting} />
            </BasicInput>
          </div>
          <div className="col-md-6">
            <BasicInput label={"Fecha"}>
              <TypeInput type="date" name="date" value={form.date} onChange={change} required disabled={isSubmitting} />
            </BasicInput>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <BasicInput label={"Nueva Portada (Opcional)"}>
              <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" disabled={isSubmitting} />
              {imagePreview && <img src={imagePreview} className="mt-2 img-thumbnail" style={{ height: '120px', objectFit: 'cover' }} alt="Vista previa" />}
            </BasicInput>
          </div>
          <div className="col-md-6">
            <BasicInput label={"Nuevo PDF (Opcional)"}>
              <input type="file" className="form-control" onChange={(e) => setPdfFile(e.target.files[0])} accept="application/pdf" disabled={isSubmitting} />
              {currentFiles.pdf && <p className="small text-muted mt-2">Ya existe un PDF cargado.</p>}
            </BasicInput>
          </div>
        </div>

        <button type="submit" className="btn-custom w-100 mt-4" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : "Guardar Cambios"}
        </button>
      </form>
      <div className="mt-3">
        <BackButton texto="Cancelar" />
      </div>
    </BasicCard>
  );
}

export default EditBook;