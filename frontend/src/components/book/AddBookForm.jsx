import { useState } from "react";
import BasicButton from "../ui/BasicButton";

function AddBookForm({ onSubmit }) {

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    synopsis: "",
    pages: "",
    date: "",
    image: "",
    file: ""
  });

  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const fileToBase64 = (file, name) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {

      setForm(prev => ({
        ...prev,
        [name]: reader.result
      }));

    };

  };

  const handleFile = (e) => {

    const file = e.target.files[0];

    const name = e.target.name;

    if (file) {

      fileToBase64(file, name);

    }

  };

  const submit = (e) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <div className="form-container">

      <div className="form-wrapper">

        <h2>Agregar Libro</h2>

        <div className="form-card">

          <form onSubmit={submit}>

            <div className="mb-3">
              <label className="form-label">
                Título
              </label>

              <input
                className="form-control"
                name="title"
                onChange={change}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Autor
              </label>

              <input
                className="form-control"
                name="author"
                onChange={change}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Género
              </label>

              <input
                className="form-control"
                name="genre"
                onChange={change}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Sinopsis
              </label>

              <textarea
                className="form-control"
                name="synopsis"
                onChange={change}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Páginas
              </label>

              <input
                type="number"
                className="form-control"
                name="pages"
                onChange={change}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Fecha
              </label>

              <input
                type="date"
                className="form-control"
                name="date"
                onChange={change}
              />
            </div>

            <div className="mb-3">

              <label className="form-label">
                Imagen
              </label>

              <input
                type="file"
                accept="image/*"
                name="image"
                className="form-control"
                onChange={handleFile}
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                PDF
              </label>

              <input
                type="file"
                accept="application/pdf"
                name="file"
                className="form-control"
                onChange={handleFile}
              />

            </div>


            <input
              type="submit"
              value="Guardar Libro"
              className="btn-custom"
            />

            <br /><br />

            <BasicButton
              to="/libros"
              texto="Volver"
            />

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddBookForm;