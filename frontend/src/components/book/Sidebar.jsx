function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <h3>CATÁLOGOS</h3>
        <ul>
          <li className="active">Todos</li>
          <li>Novedades</li>
          <li>Populares</li>
        </ul>

        <h3>GÉNEROS</h3>
        <ul>
          <li>Ficción</li>
          <li>Misterio</li>
          <li>Fantasía</li>
          <li>Historia</li>
          <li>Biografía</li>
        </ul>

        <h3>IDIOMAS</h3>
        <ul>
          <li>Español</li>
          <li>Inglés</li>
        </ul>

        <h3>FORMATOS</h3>
        <ul>
          <li>Ebook</li>
          <li>Audiolibro</li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
