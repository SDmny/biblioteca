import { useState } from "react";

function AddBook() {

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

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


  const change = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });


  const fileToBase64 = (file, name) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {

      let result = reader.result;

      if (
        name === "file" &&
        !result.startsWith(
          "data:application/pdf"
        )
      ) {
        result =
          "data:application/pdf;base64," +
          result.split(",")[1];
      }

      setForm((prev) => ({
        ...prev,
        [name]: result,
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

    const books =
      JSON.parse(
        localStorage.getItem("books")
      ) || [];

    const newBook = {

      id: Date.now(),

      title: form.title,

      author: form.author,

      edition: form.edition,

      genre: form.genre,

      description: form.synopsis,

      pages: form.pages,

      date: form.date,

      image: form.image,

      file: form.file,

      usuario: user.usuario,

    };

    books.push(newBook);

    localStorage.setItem(
      "books",
      JSON.stringify(books)
    );

    alert("Libro agregado");

    window.location.reload();
  };


  return (

    <div className="form-container">

      <div className="form-wrapper">

        <h2>Añadir Libro</h2>

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


            {/* imagen */}

            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="form-control"
                onChange={handleFile}
              />
            </div>


            {/* pdf */}

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


            <input
              type="submit"
              value="Guardar"
              className="btn-custom"
            />

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddBook;