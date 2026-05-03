import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import BasicCard from "../../components/ui/BasicCard.jsx";
import BasicInput from "../../components/ui/BasicInput.jsx";
import TypeInput from "../../components/ui/TypeInput.jsx";
import BackButton from "../../components/ui/BackButton.jsx";

function AddBook() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    author: "",
    edition: "",
    synopsis: "",
    pages: "",
    date: "",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const { data: genres, error } = await supabase
        .from("genre")
        .select("*")
        .order("genre", { ascending: true });
      if (!error) setGenresList(genres);
    };
    fetchInitialData();
  }, []);

  const change = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const obtenerErrores = () => {
    let errores = [];
    if (!form.title.trim()) errores.push("Título");
    if (!form.author.trim()) errores.push("Autor");
    if (!form.synopsis.trim()) errores.push("Sinopsis");
    if (!form.date) errores.push("Fecha");
    
    const numPages = parseInt(form.pages);
    if (isNaN(numPages) || numPages <= 0) errores.push("Páginas válidas");
    
    if (selectedGenres.length === 0) errores.push("Etiquetas");
    if (!imageFile) errores.push("Portada");
    if (!pdfFile) errores.push("Archivo PDF");
    
    return errores;
  };

  const erroresActuales = obtenerErrores();
  const esValido = erroresActuales.length === 0 && !loading;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const uploadToStorage = async (file, bucket) => {
    const fileExt = file.name.split(".").pop();
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
    if (!user) return Swal.fire("Error", "Sesión no válida", "error");
    if (!esValido) return;

    setLoading(true);
    Swal.fire({
      title: "Guardando...",
      text: "Publicando libro en la biblioteca",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const imageUrl = await uploadToStorage(imageFile, "Images_books");
      const pdfUrl = await uploadToStorage(pdfFile, "books_pdfs");

      const { data: newBook, error: bookError } = await supabase
        .from("book")
        .insert([{
          title: form.title.trim(),
          author: form.author.trim(),
          edition: form.edition.trim(),
          synopsis: form.synopsis,
          pages: parseInt(form.pages),
          date: form.date,
          image_url: imageUrl,
          pdf_url: pdfUrl,
          user_id: user.id
        }])
        .select()
        .single();

      if (bookError) throw bookError;

      const genreInserts = selectedGenres.map(genreId => ({
        book_id: newBook.id,
        genre_id: genreId
      }));

      const { error: genreError } = await supabase.from("book_genres").insert(genreInserts);
      if (genreError) throw genreError;

      Swal.fire("Éxito", "Libro añadido correctamente", "success").then(() => navigate("/libros"));
    } catch (error) {
      Swal.fire("Error", "No se pudo subir el libro: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicCard titulo={"Añadir Nuevo Libro"}>
      <form onSubmit={submit}>
        <BasicInput label={"Título del Libro"}>
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
            gap: '8px', padding: '12px', border: '1px solid #ced4da', borderRadius: '8px',
            maxHeight: '160px', overflowY: 'auto', backgroundColor: '#f8f9fa'
          }}>
            {genresList.filter(g => g.genre.toLowerCase().includes(searchTerm.toLowerCase())).map((g) => (
              <label key={g.id} style={{ display: 'flex', alignItems: 'center', fontSize: '0.85em', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(g.id)}
                  onChange={() => handleGenreChange(g.id)}
                  style={{ marginRight: '8px' }}
                />
                {g.genre}
              </label>
            ))}
          </div>
        </BasicInput>

        <BasicInput label={"Sinopsis"}>
          <textarea className="form-control" name="synopsis" value={form.synopsis} onChange={change} required rows="3" />
        </BasicInput>

        <div className="row">
          <div className="col-md-4">
            <BasicInput label={"Páginas"}>
              <TypeInput type="number" name="pages" value={form.pages} onChange={change} required />
            </BasicInput>
          </div>
          <div className="col-md-8">
            <BasicInput label={"Fecha de Publicación"}>
              <TypeInput type="date" name="date" value={form.date} onChange={change} required />
            </BasicInput>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <BasicInput label={"Portada (Imagen)"}>
              <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxHeight: '100px', marginTop: '10px' }} />}
            </BasicInput>
          </div>
          <div className="col-md-6">
            <BasicInput label={"Libro Completo (PDF)"}>
              <input type="file" className="form-control" onChange={(e) => setPdfFile(e.target.files[0])} accept="application/pdf" />
              {pdfFile && <small className="text-success d-block mt-1">✓ {pdfFile.name}</small>}
            </BasicInput>
          </div>
        </div>

        <div className="mt-4">
          {erroresActuales.length > 0 ? (
            <div className="alert alert-warning py-2" style={{ fontSize: '0.85rem' }}>
              <strong>Pendiente:</strong> {erroresActuales.join(", ")}
            </div>
          ) : (
            <div className="alert alert-success py-2" style={{ fontSize: '0.85rem' }}>
              ✓ Listo para publicar
            </div>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button 
            type="submit" 
            className="btn-custom w-100" 
            disabled={!esValido}
            style={{ 
              padding: '12px', 
              fontWeight: 'bold',
              opacity: esValido ? 1 : 0.5,
              cursor: esValido ? "pointer" : "not-allowed"
            }}
          >
            {loading ? "Procesando..." : "Publicar Libro"}
          </button>
        </div>
      </form>

      <div className="text-start" style={{ marginTop: "15px" }}>
        <BackButton texto="← Cancelar" />
      </div>
    </BasicCard>
  );
}

export default AddBook;