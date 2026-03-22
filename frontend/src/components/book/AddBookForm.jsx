import { useState } from "react";
import Swal from "sweetalert2";

function AddBookForm({ onSubmit }) {
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

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fileToBase64 = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        [name]: reader.result,
      }));
    };
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) fileToBase64(file, name);
  };

  const submit = (e) => {
    e.preventDefault();

    // Normalizar con trim
    const titleTrimmed = form.title ? form.title.trim() : "";
    const authorTrimmed = form.author ? form.author.trim() : "";
    const genreTrimmed = form.genre ? form.genre.trim() : "";
    const synopsisTrimmed = form.synopsis ? form.synopsis.trim() : "";

    if (!titleTrimmed || !authorTrimmed || !genreTrimmed || !synopsisTrimmed || !form.edition || !form.pages || !form.date) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos y no pueden ser solo espacios", "warning");
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

    if (!form.image) {
      Swal.fire("Error", "Debes adjuntar una imagen", "error");
      return;
    }

    if (!form.file) {
      Swal.fire("Error", "Debes adjuntar un PDF", "error");
      return;
    }

    onSubmit({
      ...form,
      title: titleTrimmed,
      author: authorTrimmed,
      genre: genreTrimmed,
      synopsis: synopsisTrimmed,
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Agregar Libro</h2>
        <div className="form-card">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input className="form-control" name="title" value={form.title} onChange={change} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Autor</label>
              <input className="form-control" name="author" value={form.author} onChange={change} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Edición</label>
              <input className="form-control" name="edition" value={form.edition} onChange={change} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Género</label>
              <input className="form-control" name="genre" value={form.genre} onChange={change} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Sinopsis</label>
              <textarea className="form-control" name="synopsis" value={form.synopsis} onChange={change} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Páginas</label>
              <input type="number" className="form-control" name="pages" value={form.pages} onChange={change} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha</label>
              <input type="date" className="form-control" name="date" value={form.date} onChange={change} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input type="file" accept="image/*" name="image" className="form-control" onChange={handleFile} required />
            </div>

            <div className="mb-3">
              <label className="form-label">PDF</label>
              <input type="file" accept="application/pdf" name="file" className="form-control" onChange={handleFile} required />
            </div>

            <input type="submit" value="Guardar Libro" className="btn-custom" />
            <br /><br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBookForm;