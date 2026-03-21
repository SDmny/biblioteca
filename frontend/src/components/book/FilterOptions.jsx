function FilterOptions({ onAction }) {
  return (
    <>
      <h3>Filtros</h3>

      <button onClick={() => onAction("todos")}>Todos</button>
      <button onClick={() => onAction("populares")}>Populares</button>
      <button onClick={() => onAction("nuevos")}>Nuevos</button>

      <h4>Género</h4>
      <button onClick={() => onAction("genero", "Ficción")}>Ficción</button>
      <button onClick={() => onAction("genero", "Misterio")}>Misterio</button>
      <button onClick={() => onAction("genero", "Historia")}>Historia</button>

      <h4>Idioma</h4>
      <button onClick={() => onAction("idioma", "Español")}>Español</button>
      <button onClick={() => onAction("idioma", "Inglés")}>Inglés</button>

      <h4>Páginas</h4>
      <button onClick={() => onAction("largos")}>Más de 400 páginas</button>
    </>
  );
}

export default FilterOptions;
