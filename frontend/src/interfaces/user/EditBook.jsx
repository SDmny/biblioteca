import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BasicButton from "../../components/ui/BasicButton";
import BackButton from "../../components/ui/BackButton";

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

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fileToBase64 = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      setForm((prev) => ({
        ...prev,
        [name]: reader.result,
      }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) fileToBase64(file, name);
  };

  const submit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user")) || {};

    // Validación de permisos
    if (
      bookOwner &&
      bookOwner !== currentUser.usuario &&
      currentUser.rol !== "admin"
    ) {
      Swal.fire("Acceso denegado", "No tienes permiso para editar este libro", "error");
      return;
    }

    // Validaciones de campos
    if (!form.title || !form.author || !form.edition || !form.genre || !form.synopsis || !form.pages || !form.date) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos obligatorios", "warning");
      return;
    }

    if (isNaN(form.edition) || parseInt(form.edition) <= 0) {
      Swal.fire("Error", "La edición debe ser un número válido", "error");
      return;
    }

    if (isNaN(form.pages) || parseInt(form.pages) <= 0) {
      Swal.fire("Error", "El número de páginas debe ser un número válido", "error");
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

      Swal.fire("Éxito", "Libro actualizado correctamente", "success");
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
                type="number"
                className="form-control"
                name="edition"
                value={form.edition}
                onChange={change}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Género</label>
              <input
                className="form-control"
                name="genre"
                value={form.genre}
                onChange={change}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Sinopsis</label>
              <textarea
                className="form-control"
                name="synopsis"
                value={form.synopsis}
                onChange={change}
                required
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
                required
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
                required
              />
            </div>

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
            <BackButton />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBook;