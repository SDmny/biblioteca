import AddBookForm from "../../components/book/AddBookForm";

import { useNavigate } from "react-router-dom";

function Dashboard() {

  const nav = useNavigate();


  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  if (!user) {

    return (

      <div className="main-container">

        <h2>No autorizado</h2>

        <button
          className="btn-main"
          onClick={() => nav("/login")}
        >
          Ir a login
        </button>

      </div>

    );

  }



  const guardarLibro = (book) => {

    const libros =
      JSON.parse(
        localStorage.getItem("books")
      ) || [];


    book.id = Date.now();


    libros.push(book);


    localStorage.setItem(
      "books",
      JSON.stringify(libros)
    );


    alert("Libro guardado");

  };



  return (

    <div className="main-container">

      <h2>Panel de administración</h2>


      <AddBookForm
        onSubmit={guardarLibro}
      />


    </div>

  );

}

export default Dashboard;