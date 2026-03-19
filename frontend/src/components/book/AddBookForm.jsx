import { useState } from "react";
import BasicInput from "../ui/BasicInput";
import TypeInput from "../ui/TypeInput";
import BasicButton from "../ui/BasicButton";

function AddBookForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    synopsis: "",
    publishDate: "",
    pages: "",
    cover: null,
    pdf: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <h2>Agregar Libro</h2>
      <form onSubmit={handleSubmit}>
        <BasicInput label={"Título"}>
          <TypeInput
            type="text"
            name="title"
            placeholder="Título del libro"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Autor"}>
          <TypeInput
            type="text"
            name="author"
            placeholder="Autor(es)"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Género"}>
          <TypeInput
            type="text"
            name="genre"
            placeholder="Ej: Ficción, Misterio..."
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Sinopsis"}>
          <textarea
            className="form-control"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            placeholder="Breve descripción del libro"
            required
          />
        </BasicInput>

        <BasicInput label={"Fecha de Publicación"}>
          <TypeInput
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Número de páginas"}>
          <TypeInput
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            required
          />
        </BasicInput>

        <BasicInput label={"Portada"}>
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
        </BasicInput>

        <BasicInput label={"Archivo PDF"}>
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            className="form-control"
            onChange={handleFileChange}
          />
        </BasicInput>

        <input type="submit" value="Guardar Libro" className="btn-custom" />
        <BasicButton to={"/dashboard"} texto={"Volver"} />
      </form>
    </>
  );
}

export default AddBookForm;
