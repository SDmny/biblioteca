import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicButton from "../../components/ui/BasicButton";

function EditBook() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    author: "",
    edition: "",
    genre: "",
    synopsis: "",
    pages: "",
    date: "",
    image: "",
    file: "",
  });

  const [bookOwner, setBookOwner] = useState("");

  // Cargar libro existente
  useEffect(() => {
    const libros = JSON.parse(localStorage.getItem("books")) || [];
    const book = libros.find((b) => String(b.id) === String(id));
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        edition: book.edition || "",
        genre: book.genre,
        synopsis: book.description,
        pages: book.pages,
        date: book.date || "",
        image: book.image || "",
        file: book.file || "",
      });
      setBookOwner(book.usuario || "");
    }
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fileToBase64 = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setForm((prev) => ({ ...prev, [name]: reader.result }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) fileToBase64(file, name);
  };

  // Guardar cambios
  const submit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user")) || {}; // Usuario actual

    if (bookOwner && bookOwner !== currentUser.usuario) {
      alert("No tienes permiso para editar este libro.");
      return;
    }

    const libros = JSON.parse(localStorage.getItem("books")) || [];
    const index = libros.findIndex((b) => String(b.id) === String(id));

    if (index >= 0) {
      libros[index] = {
        ...libros[index],
        title: form.title,
        author: form.author,
        edition: form.edition,
        genre: form.genre,
        description: form.synopsis,
        pages: form.pages,
        date: form.date,
        image: form.image,
        file: form.file,
      };
      localStorage.setItem("books", JSON.stringify(libros));
      alert("Libro actualizado");
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Editar Libro</h2>
        <div className="form-card">
          <form onSubmit={submit}>

            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                className="form-control"
                name="title"
                value={form.title}
                onChange={change}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Autor</label>
              <input
                className="form-control"
                name="author"
                value={form.author}
                onChange={change}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Edición</label>
              <input
                className="form-control"
                name="edition"
                value={form.edition}
                onChange={change}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Género</label>
              <input
                className="form-control"
                name="genre"
                value={form.genre}
                onChange={change}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Sinopsis</label>
              <textarea
                className="form-control"
                name="synopsis"
                value={form.synopsis}
                onChange={change}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Páginas</label>
              <input
                type="number"
                className="form-control"
                name="pages"
                value={form.pages}
                onChange={change}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={form.date}
                onChange={change}
              />
            </div>

            {/* Imagen */}
            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="form-control"
                onChange={handleFile}
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  style={{ maxWidth: 150, marginTop: 10 }}
                />
              )}
            </div>

            {/* PDF */}
            <div className="mb-3">
              <label className="form-label">PDF</label>
              <input
                type="file"
                accept="application/pdf"
                name="file"
                className="form-control"
                onChange={handleFile}
              />
            </div>

            <input type="submit" value="Guardar Cambios" className="btn-custom" />
            <br /><br />
            <BasicButton to="/perfil" texto="Volver" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBook;