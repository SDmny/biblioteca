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
        const { data: genres } = await supabase
          .from("genre")
          .select("*")
          .order("genre", { ascending: true });
        setGenresList(genres || []);

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

  const obtenerErrores = () => {
    let errores = [];
    if (!form.title.trim()) errores.push("Título vacío");
    if (!form.author.trim()) errores.push("Autor vacío");
    if (!form.synopsis.trim()) errores.push("Sinopsis vacía");
    if (!form.date) errores.push("Falta fecha");
    
    const numPages = parseInt(form.pages);
    if (isNaN(numPages) || numPages <= 0) errores.push("Páginas deben ser > 0");
    
    if (selectedGenres.length === 0) errores.push("Selecciona al menos 1 etiqueta");
    
    return errores;
  };

  const erroresActuales = obtenerErrores();
  const esValido = erroresActuales.length === 0 && !isSubmitting;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadToStorage = async (file, bucket) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!esValido) return;

    setIsSubmitting(true);
    Swal.fire({
      title: "Actualizando...",
      text: "Guardando cambios...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const imageUrl = imageFile ? await uploadToStorage(imageFile, "Images_books") : currentFiles.image;
      const pdfUrl = pdfFile ? await uploadToStorage(pdfFile, "books_pdfs") : currentFiles.pdf;

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
      await supabase.from("book_genres").insert(
        selectedGenres.map(gid => ({ book_id: id, genre_id: gid }))
      );

      await Swal.fire("Éxito", "Cambios guardados correctamente", "success");
      navigate(`/libro/${id}`);

    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <BasicCard titulo={"Editar Libro"}>
      <form onSubmit={submit}>
        <BasicInput label={"Título"}>
          <TypeInput type="text" name="title" value={form.title} onChange={change} required />
        </BasicInput>

        <div className="row">
          <div className="col-md-6">
            <BasicInput label={"Autor"}>
              <TypeInput type="text" name="author" value={form.author} onChange={change} required />
            </BasicInput>
          </div>
          <div className="col-md-6">
            <BasicInput label={"Edición"}>
              <TypeInput type="text" name="edition" value={form.edition} onChange={change} required />
            </BasicInput>
          </div>
        </div>

        <BasicInput label={"Etiquetas"}>
          <input 
            type="text" className="form-control form-control-sm mb-2" 
            placeholder="Buscar etiqueta..." value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', 
            gap: '8px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px',
            maxHeight: '150px', overflowY: 'auto', backgroundColor: '#fff' 
          }}>
            {genresList.filter(g => g.genre.toLowerCase().includes(searchTerm.toLowerCase())).map((g) => (
              <label key={g.id} style={{ display: 'flex', alignItems: 'center', fontSize: '0.85em', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g.id)}
                  onChange={() => {
                    setSelectedGenres(prev => 
                      prev.includes(g.id) ? prev.filter(i => i !== g.id) : [...prev, g.id]
                    );
                  }}
                  style={{ marginRight: '5px' }}
                />
                {g.genre}
              </label>
            ))}
          </div>
        </BasicInput>

        <BasicInput label={"Sinopsis"}>
          <textarea className="form-control" name="synopsis" value={form.synopsis} onChange={change} rows="3" />
        </BasicInput>

        <div className="row">
          <div className="col-md-6">
            <BasicInput label={"Páginas"}>
              <TypeInput type="number" name="pages" value={form.pages} onChange={change} required />
            </BasicInput>
          </div>
          <div className="col-md-6">
            <BasicInput label={"Fecha"}>
              <TypeInput type="date" name="date" value={form.date} onChange={change} required />
            </BasicInput>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <BasicInput label={"Nueva Portada (Opcional)"}>
              <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
              {imagePreview && <img src={imagePreview} className="mt-2 img-thumbnail" style={{ height: '100px', objectFit: 'cover' }} />}
            </BasicInput>
          </div>
          <div className="col-md-6">
            <BasicInput label={"Nuevo PDF (Opcional)"}>
              <input type="file" className="form-control" onChange={(e) => setPdfFile(e.target.files[0])} accept="application/pdf" />
              {currentFiles.pdf && <p className="small text-muted mt-2">PDF actual conservado.</p>}
            </BasicInput>
          </div>
        </div>

        <div className="mt-4">
          {erroresActuales.length > 0 ? (
            <div className="alert alert-warning py-2" style={{ fontSize: '0.85rem' }}>
              <strong>Falta completar:</strong> {erroresActuales.join(", ")}
            </div>
          ) : (
            <div className="alert alert-success py-2" style={{ fontSize: '0.85rem' }}>
              ✓ Todos los campos están correctos
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn-custom w-100" 
          disabled={!esValido}
          style={{ 
            opacity: esValido ? 1 : 0.5,
            cursor: esValido ? "pointer" : "not-allowed",
            padding: '12px', fontWeight: 'bold'
          }}
        >
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
      <div className="mt-3">
        <BackButton texto="← Cancelar" />
      </div>
    </BasicCard>
  );
}

export default EditBook;