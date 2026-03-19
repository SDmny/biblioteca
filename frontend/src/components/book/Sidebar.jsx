function Sidebar({ filtrar }) {

  return (

    <div className="sidebar">

      <h3>Filtros</h3>


      <button onClick={() => filtrar("todos")}>
        Todos
      </button>


      <button onClick={() => filtrar("populares")}>
        Populares
      </button>


      <button onClick={() => filtrar("nuevos")}>
        Nuevos
      </button>



      <h4>Género</h4>

      <button onClick={() => filtrar("genero","Ficción")}>
        Ficción
      </button>

      <button onClick={() => filtrar("genero","Misterio")}>
        Misterio
      </button>

      <button onClick={() => filtrar("genero","Historia")}>
        Historia
      </button>



      <h4>Idioma</h4>

      <button onClick={() => filtrar("idioma","Español")}>
        Español
      </button>

      <button onClick={() => filtrar("idioma","Inglés")}>
        Inglés
      </button>



      <h4>Páginas</h4>

      <button onClick={() => filtrar("largos")}>
        Más de 400 páginas
      </button>

    </div>

  );

}

export default Sidebar;