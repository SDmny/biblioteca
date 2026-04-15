import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BasicCard from "../../components/ui/BasicCard.jsx";
import BasicInput from "../../components/ui/BasicInput.jsx";
import TypeInput from "../../components/ui/TypeInput.jsx";
import BackButton from "../../components/ui/BackButton.jsx";

function AddBook() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

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

  const [loadingFile, setLoadingFile] = useState(false);

  const change = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const fileToBase64 = (file, name) => {
    const reader = new FileReader();
    setLoadingFile(true);
    reader.readAsDataURL(file);

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        [name]: reader.result,
      }));
      setLoadingFile(false);
    };

    reader.onerror = () => {
      Swal.fire("Error", "No se pudo leer el archivo", "error");
      setLoadingFile(false);
    };
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) fileToBase64(file, e.target.name);
  };

  const submit = (e) => {
    e.preventDefault();

    if (loadingFile) {
      Swal.fire("Espere", "El archivo se está cargando", "info");
      return;
    }

    const titleTrimmed = form.title?.trim();
    const authorTrimmed = form.author?.trim();
    const editionTrimmed = form.edition?.trim(); 

    if (!titleTrimmed || !authorTrimmed || !editionTrimmed || !form.file || !form.image) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos", "warning");
      return;
    }

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const newBook = {
      id: Date.now(),
      title: titleTrimmed,
      author: authorTrimmed,
      edition: editionTrimmed,
      genre: form.genre,
      description: form.synopsis,
      pages: form.pages,
      date: form.date,
      image: form.image,
      file: form.file,
      usuario: user.usuario,
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    Swal.fire("Éxito", "Libro agregado correctamente", "success").then(() => {
      window.location.reload();
    });
  };

  return (
    <BasicCard titulo={"Agregar Libro"}>
      <form onSubmit={submit}>
        
        <BasicInput label={"Título"}>
          <TypeInput type="text" name="title" value={form.title} onChange={change} required />
        </BasicInput>

        <BasicInput label={"Autor"}>
          <TypeInput type="text" name="author" value={form.author} onChange={change} required />
        </BasicInput>

        <BasicInput label={"Edición"}>
          <TypeInput type="text" name="edition" value={form.edition} onChange={change} required />
        </BasicInput>

        <BasicInput label={"Género"}>
          <TypeInput type="text" name="genre" value={form.genre} onChange={change} required />
        </BasicInput>

        <BasicInput label={"Sinopsis"}>
          <textarea
            className="form-control"
            name="synopsis"
            value={form.synopsis}
            onChange={change}
            required
            rows="3"
          />
        </BasicInput>

        <BasicInput label={"Páginas"}>
          <TypeInput type="number" name="pages" value={form.pages} onChange={change} required />
        </BasicInput>

        <BasicInput label={"Fecha"}>
          <TypeInput type="date" name="date" value={form.date} onChange={change} required />
        </BasicInput>

        <BasicInput label={"Imagen de portada"}>
          <TypeInput type="file" name="image" onChange={handleFile} accept="image/*" required />
          {form.image && (
            <img src={form.image} alt="preview" style={{ maxWidth: 100, marginTop: 10, borderRadius: 5 }} />
          )}
        </BasicInput>

        <BasicInput label={"Archivo PDF"}>
          <TypeInput type="file" name="file" onChange={handleFile} accept="application/pdf" required />
        </BasicInput>

        <div style={{ marginTop: "20px" }}>
          <input type="submit" value="Guardar Libro" className="btn-custom" />
          
          {user.rol !== "admin" && (
            <div style={{ marginTop: "10px" }}>
              <BackButton />
            </div>
          )}
        </div>
      </form>
    </BasicCard>
  );
}

export default AddBook;